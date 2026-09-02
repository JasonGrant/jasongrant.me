// Build-time feature flags for the case-study framework. Plain constants (not
// env vars) so the site stays fully static — flip a value and redeploy.
export const FEATURES: { walkthroughControls: boolean } = {
  // The walkthrough player's guided-tour controls (Prev / Play / Stop / Next)
  // and the Transcript. Off for now while the guided tour isn't ready to show:
  // the replica product screens still render (the settings screens stay live
  // and operable), only the tour controls and transcript are hidden. Set to
  // true to restore the full player.
  walkthroughControls: false,
};
