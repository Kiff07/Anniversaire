import React, { useEffect, useRef, useState } from 'react';
import { cinemaAudio } from '../utils/audioEffects';
import { Volume2, VolumeX, SkipForward, Play, Sparkles, Film } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UniversalIntroProps {
  starName: string;
  age: number;
  onComplete: () => void;
}

export const UniversalIntro: React.FC<UniversalIntroProps> = ({ starName, age, onComplete }) => {
  const [phase, setPhase] = useState<'prompt' | 'universal' | 'countdown' | 'action' | 'curtain'>('prompt');
  const [isMuted, setIsMuted] = useState(false);
  const [countdownNum, setCountdownNum] = useState<number | null>(5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Studio text to orbit the globe
  const studioTitle = `${starName.toUpperCase()} STUDIOS`;

  const startExperience = () => {
    cinemaAudio.enabled = !isMuted;
    setPhase('universal');
    cinemaAudio.playUniversalFanfare();
  };

  const handleSkip = () => {
    onComplete();
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
    cinemaAudio.enabled = isMuted;
  };

  // Phase transitions
  useEffect(() => {
    if (phase === 'universal') {
      // Universal globe runs for ~7 seconds, then enters vintage countdown
      const timer = setTimeout(() => {
        setPhase('countdown');
      }, 7500);
      return () => clearTimeout(timer);
    }

    if (phase === 'countdown') {
      let count = 5;
      setCountdownNum(5);
      cinemaAudio.playCountdownBeep(false);

      const interval = setInterval(() => {
        count -= 1;
        if (count >= 1) {
          setCountdownNum(count);
          cinemaAudio.playCountdownBeep(false);
        } else {
          clearInterval(interval);
          setPhase('action');
          cinemaAudio.playClapSound();
          cinemaAudio.playCountdownBeep(true);
        }
      }, 950);

      return () => clearInterval(interval);
    }

    if (phase === 'action') {
      const timer = setTimeout(() => {
        setPhase('curtain');
        cinemaAudio.playApplause();
        try {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#ff0055', '#00e5ff', '#ffffff']
          });
        } catch {
          // ignore if canvas not ready
        }
      }, 1400);

      return () => clearTimeout(timer);
    }

    if (phase === 'curtain') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Canvas Globe & Starfield Animation
  useEffect(() => {
    if (phase !== 'universal') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars
    const starCount = 280;
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
    }));

    let angle = 0;
    let textOrbit = -Math.PI * 0.7;
    let startTime = Date.now();

    const render = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      ctx.fillStyle = '#030308';
      ctx.fillRect(0, 0, width, height);

      // Deep space nebula glow
      const gradNebula = ctx.createRadialGradient(
        width * 0.5, height * 0.5, 50,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.7
      );
      gradNebula.addColorStop(0, 'rgba(28, 18, 56, 0.45)');
      gradNebula.addColorStop(0.5, 'rgba(12, 10, 30, 0.6)');
      gradNebula.addColorStop(1, '#020205');
      ctx.fillStyle = gradNebula;
      ctx.fillRect(0, 0, width, height);

      // Draw starry sky
      stars.forEach((s) => {
        s.alpha += (Math.random() - 0.5) * 0.04;
        if (s.alpha < 0.2) s.alpha = 0.2;
        if (s.alpha > 1) s.alpha = 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Globe parameters
      const globeRadius = Math.min(width, height) * 0.24;
      const globeX = width * 0.5;
      const globeY = height * 0.48;

      // Sun flare behind the globe (Universal style crescent glow)
      const flareProgress = Math.min(1, elapsed / 4);
      const flareX = globeX - globeRadius * 0.75;
      const flareY = globeY - globeRadius * 0.65;

      const sunGlow = ctx.createRadialGradient(
        flareX, flareY, 5,
        flareX, flareY, globeRadius * 2.2
      );
      sunGlow.addColorStop(0, `rgba(255, 245, 200, ${0.85 * flareProgress})`);
      sunGlow.addColorStop(0.2, `rgba(255, 180, 50, ${0.45 * flareProgress})`);
      sunGlow.addColorStop(0.5, `rgba(180, 70, 20, ${0.15 * flareProgress})`);
      sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(flareX, flareY, globeRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric outer glow
      const atmoGlow = ctx.createRadialGradient(
        globeX, globeY, globeRadius * 0.95,
        globeX, globeY, globeRadius * 1.25
      );
      atmoGlow.addColorStop(0, 'rgba(90, 160, 255, 0.4)');
      atmoGlow.addColorStop(0.5, 'rgba(60, 110, 220, 0.15)');
      atmoGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = atmoGlow;
      ctx.beginPath();
      ctx.arc(globeX, globeY, globeRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Draw Globe body
      ctx.save();
      ctx.beginPath();
      ctx.arc(globeX, globeY, globeRadius, 0, Math.PI * 2);
      ctx.clip();

      // Ocean deep blue sphere gradient
      const sphereGrad = ctx.createRadialGradient(
        globeX - globeRadius * 0.4, globeY - globeRadius * 0.4, globeRadius * 0.1,
        globeX, globeY, globeRadius
      );
      sphereGrad.addColorStop(0, '#1a4875');
      sphereGrad.addColorStop(0.5, '#0e2947');
      sphereGrad.addColorStop(0.85, '#061221');
      sphereGrad.addColorStop(1, '#010408');
      ctx.fillStyle = sphereGrad;
      ctx.fillRect(globeX - globeRadius, globeY - globeRadius, globeRadius * 2, globeRadius * 2);

      // Draw rotating continents / landmasses simulation
      angle += 0.008;
      ctx.fillStyle = '#2d6a4f';
      ctx.strokeStyle = '#52b788';
      ctx.lineWidth = 1;

      // Stylized continents via procedural curves
      const continents = [
        { lat: 0.2, lon: 0.0, r: 0.35, shape: 'americas' },
        { lat: -0.3, lon: 0.2, r: 0.3, shape: 'south_am' },
        { lat: 0.35, lon: 0.9, r: 0.35, shape: 'europe' },
        { lat: -0.1, lon: 1.0, r: 0.38, shape: 'africa' },
        { lat: 0.3, lon: 1.7, r: 0.5, shape: 'asia' },
        { lat: -0.4, lon: 2.1, r: 0.25, shape: 'australia' }
      ];

      continents.forEach(c => {
        const curLon = (c.lon + angle) % (Math.PI * 2);
        // Is it visible on the front side of sphere?
        if (curLon > Math.PI * 0.5 && curLon < Math.PI * 1.5) {
          const depth = Math.sin(curLon); // -1 to 0
          const xOffset = Math.cos(curLon) * globeRadius * 0.85;
          const yOffset = c.lat * globeRadius;
          const cx = globeX + xOffset;
          const cy = globeY + yOffset;
          const r = c.r * globeRadius * (0.6 + depth * -0.4);

          ctx.fillStyle = 'rgba(46, 125, 79, 0.75)';
          ctx.beginPath();
          ctx.ellipse(cx, cy, r * 1.3, r * 0.8, 0.2, 0, Math.PI * 2);
          ctx.fill();

          // Mountain highlights
          ctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
          ctx.beginPath();
          ctx.arc(cx - r * 0.2, cy - r * 0.1, r * 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Latitude and Longitude grid lines (classic Universal globe look)
      ctx.strokeStyle = 'rgba(180, 220, 255, 0.18)';
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        const y = globeY + (lat / 90) * (globeRadius * 0.88);
        const rAtY = Math.sqrt(Math.max(0, globeRadius * globeRadius - Math.pow(y - globeY, 2)));
        ctx.beginPath();
        ctx.ellipse(globeX, y, rAtY, rAtY * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Sphere shading overlay (dark side of Earth on bottom right)
      const shadowGrad = ctx.createRadialGradient(
        globeX + globeRadius * 0.5, globeY + globeRadius * 0.5, globeRadius * 0.3,
        globeX, globeY, globeRadius
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.35)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(globeX - globeRadius, globeY - globeRadius, globeRadius * 2, globeRadius * 2);

      ctx.restore();

      // Atmospheric rim light (sharp edge highlight on upper-left)
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 230, 170, 0.85)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(globeX, globeY, globeRadius + 1, -Math.PI * 0.8, -Math.PI * 0.2);
      ctx.stroke();
      ctx.restore();

      // Universal Orbiting Golden Ring & 3D Letters
      textOrbit += 0.014;
      const letters = studioTitle.split('');
      const orbitRx = globeRadius * 1.45;
      const orbitRy = globeRadius * 0.38;
      const tilt = -0.15; // angle of orbit plane

      // Draw back-letters first (depth < 0), then front letters (depth >= 0)
      const letterData = letters.map((char, i) => {
        const charAngle = textOrbit + (i - letters.length / 2) * 0.17;
        const normAngle = ((charAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
        // Parametric ellipse in 3D
        const rawX = Math.cos(normAngle) * orbitRx;
        const rawY = Math.sin(normAngle) * orbitRy;
        // Apply tilt
        const rotX = rawX * Math.cos(tilt) - rawY * Math.sin(tilt);
        const rotY = rawX * Math.sin(tilt) + rawY * Math.cos(tilt);
        const x = globeX + rotX;
        const y = globeY + rotY + 10;
        const z = Math.sin(normAngle); // -1 (back) to +1 (front)
        return { char, x, y, z, angle: normAngle };
      });

      // Sort by depth so back letters render before front
      letterData.sort((a, b) => a.z - b.z);

      letterData.forEach(({ char, x, y, z }) => {
        // Universal golden font sizing
        const scale = 0.7 + (z + 1) * 0.3; // 0.7 to 1.3
        const fontSize = Math.max(16, Math.floor(Math.min(width, height) * 0.052 * scale));

        ctx.save();
        ctx.font = `900 ${fontSize}px 'Cinzel', serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dim back letters that pass behind the globe
        const alpha = z < 0 ? Math.max(0.15, 0.4 + z * 0.3) : 1;
        ctx.globalAlpha = alpha;

        // 3D Extrusion depth layers (gold bevel effect)
        const extrudeSteps = z > 0 ? 4 : 2;
        for (let s = extrudeSteps; s >= 1; s--) {
          ctx.fillStyle = '#6e4f16';
          ctx.fillText(char, x + s * 1.2, y + s * 1.5);
        }

        // Golden glow
        if (z > 0) {
          ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
          ctx.shadowBlur = 15 * scale;
        }

        // Face text gradient
        const textGrad = ctx.createLinearGradient(x - 10, y - fontSize / 2, x + 10, y + fontSize / 2);
        textGrad.addColorStop(0, '#ffffff');
        textGrad.addColorStop(0.25, '#fff1a8');
        textGrad.addColorStop(0.5, '#ffd700');
        textGrad.addColorStop(0.75, '#c8961c');
        textGrad.addColorStop(1, '#8b6508');
        ctx.fillStyle = textGrad;
        ctx.fillText(char, x, y);

        // Crisp specular stroke
        ctx.strokeStyle = '#fff8db';
        ctx.lineWidth = 1;
        ctx.strokeText(char, x, y);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [phase, studioTitle]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden select-none">
      {/* 1. INITIAL PROMPT SCREEN (User clicks to start with cinema sound!) */}
      {phase === 'prompt' && (
        <div className="relative z-10 max-w-xl mx-4 p-8 text-center rounded-2xl cinema-card border-2 border-yellow-500/40 backdrop-blur-xl">
          <div className="inline-flex p-4 rounded-full bg-yellow-500/10 text-yellow-400 mb-6 border border-yellow-500/30 animate-pulse">
            <Film className="w-12 h-12" />
          </div>

          <h2 className="text-sm font-semibold tracking-widest uppercase text-yellow-400 mb-2 font-cinzel">
            PREMIÈRE MONDIALE EXCLUSIVE
          </h2>

          <h1 className="text-3xl md:text-5xl font-black text-white font-cinzel tracking-wider mb-4 gold-glow">
            {starName.toUpperCase()}
          </h1>

          <div className="text-base text-gray-300 mb-8 font-light leading-relaxed">
            Installez-vous confortablement dans votre fauteuil de cinéma.
            <br />
            <span className="text-yellow-400 font-medium">Activez le son</span> pour vivre l'expérience d'ouverture grandiose façon Universal Studios !
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={startExperience}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-black font-extrabold text-lg rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/60 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current" />
              LANCER LE FILM (AVEC SON)
            </button>

            <button
              onClick={handleSkip}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-gray-300 font-semibold rounded-xl transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <SkipForward className="w-4 h-4" />
              Accéder directement au site
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            Édition spéciale Anniversaire - {age} Ans
          </div>
        </div>
      )}

      {/* 2. UNIVERSAL STUDIOS ANIMATION CANVAS */}
      {phase === 'universal' && (
        <div className="relative w-full h-full">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Subtitle Banner (Universal style) */}
          <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none px-4">
            <div className="inline-block border-t border-b border-yellow-500/60 py-2 px-8 bg-black/40 backdrop-blur-sm">
              <p className="text-yellow-300 font-cinzel tracking-[0.3em] text-sm md:text-lg font-bold drop-shadow-md">
                ★ A SPECIAL BIRTHDAY PRODUCTION ★
              </p>
              <p className="text-gray-300 text-xs md:text-sm tracking-widest mt-1 font-mono uppercase">
                CÉLÉBRATION OFFICIELLE DES {age} ANS
              </p>
            </div>
          </div>

          {/* Quick Controls Top Bar */}
          <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
            <button
              onClick={toggleSound}
              className="p-3 rounded-full bg-black/60 hover:bg-black/90 text-yellow-400 border border-yellow-500/40 backdrop-blur-md transition-all cursor-pointer"
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button
              onClick={handleSkip}
              className="px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white border border-white/20 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <SkipForward className="w-4 h-4" /> Passer
            </button>
          </div>
        </div>
      )}

      {/* 3. VINTAGE COUNTDOWN LEADER (5, 4, 3, 2, 1) */}
      {phase === 'countdown' && (
        <div className="relative w-full h-full bg-[#111] flex items-center justify-center overflow-hidden">
          {/* Film Grain & Scratches Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen bg-repeat bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          
          {/* Vertical jitter lines */}
          <div className="absolute top-0 bottom-0 left-[28%] w-[1px] bg-white/40 animate-pulse" />
          <div className="absolute top-0 bottom-0 right-[35%] w-[2px] bg-white/30 animate-pulse" />

          {/* Circular Countdown Leader Crosshair */}
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border-4 border-gray-400 flex items-center justify-center">
            {/* Concentric circles */}
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-gray-500" />
            <div className="absolute inset-12 rounded-full border border-gray-600" />

            {/* Crosshairs */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-400 -translate-x-1/2" />
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-400 -translate-y-1/2" />

            {/* Rotating radar sweep line */}
            <div 
              className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-yellow-400 origin-left"
              style={{ animation: 'spin 0.95s linear infinite' }}
            />

            {/* Big Countdown Number */}
            <div className="relative z-10 text-9xl sm:text-[11rem] font-bold text-white font-mono drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              {countdownNum}
            </div>
          </div>

          <div className="absolute bottom-10 text-center font-mono text-xs uppercase tracking-widest text-gray-400">
            SMPTE 35MM LEADER SYNC • {starName.toUpperCase()}_REEL_01
          </div>
        </div>
      )}

      {/* 4. CLAPPERBOARD "ACTION !" */}
      {phase === 'action' && (
        <div className="relative w-full h-full bg-black flex flex-col items-center justify-center px-4">
          <div className="animate-bounce mb-8">
            {/* Clapperboard Graphic */}
            <div className="w-80 sm:w-96 bg-zinc-900 border-4 border-white rounded-lg shadow-2xl p-4 text-white">
              {/* Top Clap Stick */}
              <div className="h-12 bg-black border-2 border-white rounded-t mb-3 flex overflow-hidden">
                <div className="flex-1 bg-white transform -skew-x-12 mx-1" />
                <div className="flex-1 bg-black transform -skew-x-12 mx-1" />
                <div className="flex-1 bg-white transform -skew-x-12 mx-1" />
                <div className="flex-1 bg-black transform -skew-x-12 mx-1" />
                <div className="flex-1 bg-white transform -skew-x-12 mx-1" />
                <div className="flex-1 bg-black transform -skew-x-12 mx-1" />
              </div>

              {/* Slate info */}
              <div className="border border-zinc-700 p-3 space-y-2 text-xs font-mono uppercase bg-zinc-950">
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span>PRODUCTION: <b>{starName} B-DAY</b></span>
                  <span className="text-yellow-400">PRISE: <b>01</b></span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span>RÉALISATEUR: <b>LA TEAM</b></span>
                  <span>CADRE: <b>VIP</b></span>
                </div>
                <div className="text-center pt-2">
                  <div className="text-2xl sm:text-3xl font-black text-red-500 font-bebas tracking-widest">
                    SILENCE SUR LE PLATEAU... MOTEUR... ACTION !
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. RED VELVET CURTAIN PARTING */}
      {phase === 'curtain' && (
        <div className="absolute inset-0 pointer-events-none flex z-30">
          {/* Left Curtain */}
          <div
            className="w-1/2 h-full bg-gradient-to-r from-red-950 via-red-800 to-red-900 shadow-2xl transition-transform duration-1000 ease-in-out border-r-4 border-yellow-500/80"
            style={{ transform: 'translateX(-100%)' }}
          />
          {/* Right Curtain */}
          <div
            className="w-1/2 h-full bg-gradient-to-l from-red-950 via-red-800 to-red-900 shadow-2xl transition-transform duration-1000 ease-in-out border-l-4 border-yellow-500/80"
            style={{ transform: 'translateX(100%)' }}
          />
        </div>
      )}
    </div>
  );
};
