/**
 * WHAT THIS DOES:
 * Solves the "Pyramid of Doom" in React where you have deeply nested Context Providers
 * (e.g.,
 *          <Theme>
 *              <Auth>
 *                  <Settings>
 *                          <App />
 *                  </Settings>
 *             </Auth>
 *         </Theme>).
 *
 * ANALOGY:
 * Think of your <App /> as a present (children), and the Providers as boxes.
 * This function is a machine that automatically wraps your present in multiple boxes.
 *
 * STEP 1: YOU CALL THE FACTORY (combineContext)
 * @param {...providers} - The Rest Parameter (...). Gathers all the "boxes" (providers) you pass
 *                         into an array (e.g., [ThemeProvider, AuthProvider]).
 *                         Note: combineContext is NOT a React component. It's a regular JS function.
 */
export default function combineContext(...providers) {
  /**
   * STEP 2: IT RETURNS THE ACTUAL REACT COMPONENT
   * Why does the inner function get ({ children }) and not the main function?
   * Because of a Two-Step Process:
   * 1. YOU call combineContext(Theme, Auth). It remembers the providers and returns THIS function.
   * 2. REACT sees <AppProviders><App /></AppProviders>. React calls THIS returned function
   *    and automatically passes <App /> as the `children` prop.
   */
  return ({ children }) => {
    /**
     * STEP 3: THE WRAPPING LOOP (reduceRight)
     * `reduceRight` loops through the providers array from RIGHT to LEFT (end to beginning).
     *
     * - `children` is the Initial Value (the unwrapped present: <App />).
     * - On each step, it takes the current package (`accumulator`) and wraps it inside
     *   the `Currentprovider` (the current box).
     * - This new wrapped package becomes the `accumulator` for the next step up the chain.
     *
     * Example with [Theme, Auth]:
     * 1st pass (Right): accumulator = <Auth>{children}</Auth>
     * 2nd pass (Left) : accumulator = <Theme><Auth>{children}</Auth></Theme>
     */
    return providers.reduceRight((accumulator, Currentprovider) => {
      return <Currentprovider>{accumulator}</Currentprovider>;
    }, children); // <--- Starts the wrapping process with the raw children (the App)
  };
}

// Let's break down Step 2 into the absolute finest detail, showing exactly what your computer is doing at every microsecond.

// The core concept to understand here is that combineContext is a Factory Function. A Factory Function is simply a function that makes and returns another function.

// Let's look at the two distinct moments in time when this code runs.

// Moment in Time #1: You Build the Machine (Step 1)
// You are writing your app's setup code (maybe in main.jsx or App.jsx). You write this exact line:

// const AppProviders = combineContext(ThemeProvider, AuthProvider);
// What exactly happens when JavaScript hits this line?

// JavaScript executes the combineContext function.
// It takes ThemeProvider and AuthProvider and packs them into the providers array because of the ...providers parameter.
// The function reaches the line return ({ children }) => { ... }.
// Crucial part: It does not run the code inside that return statement right now. It simply takes that whole block of code (the inner function) and hands it back to you.
// JavaScript takes that returned inner function and stores it inside your variable named AppProviders.
// The Result of Moment #1: If you could peek inside your computer's memory right now, your variable AppProviders is literally holding this exact piece of code:

// // This is what AppProviders is right now.
// // It is a function waiting to be called, waiting for an object with a 'children' property.
// ({ children }) => {
//     return [ThemeProvider, AuthProvider].reduceRight((accumulator, Currentprovider) => {
//       return <Currentprovider>{accumulator}</Currentprovider>;
//     }, children);
// }
// Notice: We still don't have the children (your <App />) yet! We just built the machine that will wrap the children later.

// Moment in Time #2: React Uses the Machine (Step 2)
// Later in your code, you write your actual React UI using JSX:

// function Root() {
//   return (
//     <AppProviders>
//       <App />
//     </AppProviders>
//   );
// }
// What exactly happens when React renders this?

// React looks at your code and sees <AppProviders>.
// React says: "Ah, I recognize this tag! The developer created a variable called AppProviders earlier. Let me look up what it is."
// React finds the function we stored in Moment #1.
// React then looks inside the <AppProviders> ... </AppProviders> tags and sees <App />.
// React says: "Okay, the developer put <App /> inside these tags. According to React rules, anything inside tags must be bundled into an object property named children."
// The Magical Translation: Behind the scenes, React automatically translates your JSX tags into a standard JavaScript function call.

// React takes the function stored in AppProviders and executes it, passing in the children object. It literally runs code that looks like this:

// // React does this for you automatically!
// AppProviders({ children: <App /> });
// The Grand Finale: The Execution
// Now, finally, the inner function executes:

// The inner function wakes up. It looks at its parameters: ({ children }).
// It receives the object React passed it: { children: <App /> }.
// Because of destructuring ({ children }), it extracts the <App />.
// It starts the reduceRight loop, using <App /> as the starting point.
// It wraps <App /> in <AuthProvider>, then wraps that whole thing in <ThemeProvider>.
// It returns the final nested JSX back to React to draw on the screen:
// <ThemeProvider>
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// </ThemeProvider>
// Summary of the Flow:
// You call combineContext(Theme, Auth). This gives you back a Blank Component Recipe. (The inner function).
// You use that recipe in your JSX as <AppProviders><App /></AppProviders>.
// React sees the JSX, grabs your Blank Component Recipe, and executes it.
// React automatically injects whatever was between the tags (<App />) directly into the recipe's ({ children }) parameter.

// if dont understand ask to expklin step 2
