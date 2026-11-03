# React Native / React Review Checklist

Use as a memory aid. Report only what actually applies to the code.

## Contents
1. Rendering & performance
2. Lists
3. Hooks & effects
4. State management & data fetching
5. Navigation
6. Platform differences & native
7. Animations & gestures
8. Styling & layout
9. Accessibility
10. Storage, security & networking
11. Images, assets & bundle size
12. Error handling & app stability
13. Testing
14. Build, config & dependencies

## 1. Rendering & performance
- Inline objects/arrays/functions passed as props to memoized children (`style={{...}}`, `onPress={() => ...}`) defeating `React.memo`.
- `React.memo` / `useMemo` / `useCallback` missing where it matters (list items, heavy children) — or overused where it adds nothing.
- Expensive computation in render without memoization.
- Context value object recreated every render, re-rendering all consumers; context too broad (split it).
- State lifted too high causing whole-screen re-renders on every keystroke.
- Unstable `key` props (index as key on reorderable/dynamic data, `Math.random()`).
- `console.log` left in hot paths (slow in release on some setups; strip with babel plugin).
- Heavy work on the JS thread blocking interactions — consider `InteractionManager.runAfterInteractions`, moving work off-thread, or deferring.

## 2. Lists
- `ScrollView` + `.map()` for long/unbounded data → use `FlatList`/`SectionList`/`FlashList`.
- `FlatList` inside a vertical `ScrollView` (virtualization breaks, warning).
- `renderItem` defined inline and not memoized; item component not `memo`.
- Missing `keyExtractor` or non-unique keys.
- Fixed-height items without `getItemLayout`.
- Tuning props: `initialNumToRender`, `windowSize`, `maxToRenderPerBatch`, `removeClippedSubviews` (Android).
- `onEndReached` firing multiple times without a loading guard → duplicate fetches.
- `extraData` missing when item rendering depends on outside state.

## 3. Hooks & effects
- Missing or wrong dependency arrays (stale closures) or deps that change every render (infinite loops).
- Subscriptions, listeners, timers, `AppState`, `Keyboard`, `Dimensions`, `NetInfo`, event emitters not cleaned up in effect return.
- Async work in effects setting state after unmount; no `AbortController` / cancelled flag.
- Effects used for derived state that could be computed during render.
- Hooks called conditionally or in loops.
- Custom hooks that leak implementation details or return new object identities every render.
- `useLayoutEffect` misuse; `useFocusEffect` without `useCallback`.

## 4. State management & data fetching
- Server state stored in Redux/Zustand manually instead of a cache (React Query/RTK Query/SWR) — duplication, stale data.
- No loading / error / empty states.
- Race conditions: older request resolving after newer one overwrites results (search-as-you-type).
- Missing debounce/throttle on search inputs, scroll handlers.
- Mutating state directly.
- Selectors returning new objects every time (Redux `useSelector` without `shallowEqual` or memoized selector).
- Global state for what should be local component state, or vice versa.

## 5. Navigation
- Passing non-serializable values (functions, class instances) in route params.
- Untyped navigation (missing `ParamList` types in TypeScript).
- Listeners added via `navigation.addListener` not removed.
- Screens doing heavy work on mount instead of on focus, or not refreshing data when re-focused.
- Deep linking config incomplete or unsafe (trusting params without validation).
- Android back button (`BackHandler`) not handled where needed, or handler not removed.

## 6. Platform differences & native
- iOS-only or Android-only behaviour not handled (`Platform.OS`, `Platform.select`, `.ios.tsx`/`.android.tsx`).
- Safe areas: notch/home indicator not respected (`react-native-safe-area-context`).
- `KeyboardAvoidingView` behaviour differs per platform (`padding` vs `height`); inputs hidden by keyboard.
- Permissions: requested without checking status, no denied/blocked handling, missing `Info.plist` usage strings or `AndroidManifest` entries.
- Android hardware back, status bar translucency, edge-to-edge differences.
- Native modules: threading, unhandled promise rejections, New Architecture compatibility of libraries.
- Hermes-specific gotchas (Intl support, etc.).

## 7. Animations & gestures
- Using `Animated` without `useNativeDriver: true` where possible.
- Reanimated: JS-thread work inside worklets, missing `'worklet'`, reading shared values on JS thread during render, `runOnJS` misuse.
- Animations not cancelled on unmount.
- Gesture handler conflicts with ScrollView / navigation gestures.

## 8. Styling & layout
- Inline styles everywhere instead of `StyleSheet.create` or a theme system.
- Hardcoded colors/sizes ignoring theme, dark mode, and font scaling.
- Hardcoded dimensions breaking on tablets / small phones / landscape; `Dimensions.get` captured once instead of `useWindowDimensions`.
- Text not wrapped in `<Text>` (crash), nested Text styling issues.
- `allowFontScaling` disabled without reason.

## 9. Accessibility
- Touchables missing `accessibilityLabel`, `accessibilityRole`, `accessibilityState`.
- Touch targets smaller than ~44×44pt; use `hitSlop`.
- Images without labels; decorative elements not hidden.
- Color-only meaning, insufficient contrast.
- Focus order and screen reader announcements for dynamic content.

## 10. Storage, security & networking
- Tokens, passwords, PII stored in `AsyncStorage`/MMKV unencrypted → use Keychain/Keystore (`react-native-keychain`, `expo-secure-store`).
- Secrets/API keys hardcoded in JS bundle (bundle is readable — anything in it is public).
- HTTP instead of HTTPS; certificate pinning for sensitive apps.
- Logging sensitive data.
- No request timeout, retry policy, or offline handling; token refresh race conditions (multiple parallel refreshes).
- WebView: `originWhitelist` too broad, `injectedJavaScript` with untrusted data, `onMessage` without validating origin.
- Deep link / push payload trusted without validation.

## 11. Images, assets & bundle size
- Large images not resized; no caching (consider `expo-image` / `react-native-fast-image`).
- Missing `resizeMode`, width/height causing layout shift.
- Heavy libraries imported whole (`lodash`, `moment`) instead of targeted imports or lighter alternatives.
- Unused dependencies.

## 12. Error handling & app stability
- No error boundary around screens/app.
- Unhandled promise rejections; empty `catch {}` blocks.
- Optional chaining missing on API data that can be null → crashes in production.
- No crash reporting (Sentry/Crashlytics) or errors not reported.
- Release-only issues: `__DEV__` checks, Proguard/R8 stripping, Hermes.

## 13. Testing
- Missing tests for business logic, reducers, hooks, and critical flows.
- Tests asserting implementation details instead of behaviour (prefer React Native Testing Library queries by role/text).
- Native modules not mocked properly; snapshot tests used as the only test.
- No E2E (Detox/Maestro) for critical flows in mature apps.

## 14. Build, config & dependencies
- Version mismatches between `react`, `react-native`, and native libraries.
- Libraries incompatible with the New Architecture or the Expo SDK in use.
- Environment config (dev/staging/prod) mixed or committed secrets in `.env`.
- Missing or loose TypeScript `strict` mode.
- iOS Podfile / Gradle changes without explanation in a diff.
