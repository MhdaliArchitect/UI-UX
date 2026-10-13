import React from 'react';

interface StageErrorBoundaryProps {
  /** Shown instead of the stage when it throws, e.g. its lazy chunk failed to download. */
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface StageErrorBoundaryState {
  failed: boolean;
}

/**
 * Keeps a failing optional section (the lazily loaded 3D monolith) from taking the whole page
 * down. Without it a rejected dynamic import unmounts the entire React tree, which happens when
 * the user is offline or an old tab asks for a hashed chunk that a newer deploy removed.
 */
export class StageErrorBoundary extends React.Component<
  StageErrorBoundaryProps,
  StageErrorBoundaryState
> {
  state: StageErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): StageErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: unknown): void {
    console.warn('HMOS: 3D stage unavailable, showing the static fallback.', error);
  }

  render(): React.ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
