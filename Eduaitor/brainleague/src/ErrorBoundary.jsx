import { Component } from "react";
import { COLORS } from "./pages/brainLeague/theme";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center gap-3 px-6 text-center"
          style={{ background: COLORS.bg }}
        >
          <div className="text-5xl">🧠💥</div>
          <h1 className="text-xl font-extrabold" style={{ color: COLORS.ink }}>
            Oops! Something went wrong.
          </h1>
          <p className="text-[13px] font-bold max-w-sm" style={{ color: "#7BA6CE" }}>
            {String(this.state.error?.message || this.state.error)}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-3 rounded-2xl font-extrabold text-white"
            style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})` }}
          >
            Reload Game
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}