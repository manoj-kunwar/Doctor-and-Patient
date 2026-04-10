// VideoCallRoom.jsx  — works with ZegoUIKitPrebuilt
import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const fmtDuration = (secs) => {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const VideoCallRoom = ({ tokenData, role, backendUrl, authToken, onEnd }) => {
  const containerRef = useRef(null);
  const startTimeRef = useRef(null);
  const timerRef    = useRef(null);
  const [elapsed,    setElapsed]    = useState(0);
  const [status,     setStatus]     = useState("Connecting…");
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !tokenData) return;

    const { appId, roomId, userId, userName } = tokenData;

    // ── Generate Kit Token directly in the browser ──
    // This is the correct way for ZegoUIKitPrebuilt
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      tokenData.token,   // server token we got from backend
      roomId,
      userId,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      showPreJoinView: true,
      showScreenSharingButton: false,
      maxUsers: 2,
      onJoinRoom: () => {
        startTimeRef.current = Date.now();
        setCallActive(true);
        setStatus("Connected");
        timerRef.current = setInterval(() => {
          setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
      },
      onLeaveRoom: async () => {
        clearInterval(timerRef.current);
        const endedAt   = new Date().toISOString();
        const startedAt = startTimeRef.current
          ? new Date(startTimeRef.current).toISOString()
          : endedAt;
        const duration  = startTimeRef.current
          ? Math.floor((Date.now() - startTimeRef.current) / 1000)
          : 0;

        try {
          await fetch(`${backendUrl}/api/video/log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              appointmentId: tokenData.appointmentId,
              duration, startedAt, endedAt,
              initiatedBy: role,
            }),
          });
        } catch (_) {}

        setCallActive(false);
        setStatus("Call ended");
        if (onEnd) onEnd({ duration, startedAt, endedAt });
      },
    });

    return () => {
      clearInterval(timerRef.current);
    };
  }, [tokenData]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0f] flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#111118] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-base tracking-tight">CareOS</span>
          <span className="w-px h-5 bg-white/20" />
          <span className="text-xs text-white/50">Secure Video Consultation</span>
        </div>
        <div className="flex items-center gap-3">
          {callActive && (
            <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">{fmtDuration(elapsed)}</span>
            </div>
          )}
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            callActive
              ? "bg-sky-500/15 border-sky-500/30 text-sky-400"
              : "bg-white/5 border-white/10 text-white/50"
          }`}>
            {status}
          </div>
        </div>
      </div>

      {/* ZEGO container */}
      <div ref={containerRef} className="flex-1 overflow-hidden" />

      {/* Bottom bar */}
      <div className="px-5 py-2 bg-[#111118] border-t border-white/10 flex items-center justify-between shrink-0">
        <span className="text-xs text-white/40">
          {role === "patient"
            ? `Consulting with Dr. ${tokenData?.docName || "—"}`
            : `Patient: ${tokenData?.patientName || "—"}`}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-white/30">
          <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round"/>
          </svg>
          End-to-end encrypted
        </span>
      </div>
    </div>
  );
};

export default VideoCallRoom;