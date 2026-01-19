import { useEffect, useRef } from "react";

/**
 * useEffectWithDebug
 * Logs exactly which dependencies triggered the effect.
 * 
 * @param {Function} effectFn - The effect function to run
 * @param {Array} deps - Dependency array
 */
const useEffectWithDebug = (effectFn, deps) => {
  const prevDeps = useRef(deps);

  useEffect(() => {

    // Check which dependencies changed
    deps.forEach((dep, index) => {
      if (prevDeps.current[index] !== dep) {
        console.log(`Dependency at index ${index} changed:`, dep);
      }
    });

    // Run the actual effect
    effectFn();

    // Update previous deps
    prevDeps.current = deps;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useEffectWithDebug;
