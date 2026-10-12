import React, { useState } from 'react';
import { BirthdayStar } from '../types/cinema';
import { Ticket, Printer, UserCheck } from 'lucide-react';

interface VipTicketProps {
  star: BirthdayStar;
}

export const VipTicket: React.FC<VipTicketProps> = ({ star }) => {
  const [guestName, setGuestName] = useState('INVITÉ VIP D’HONNEUR');
  const [seatNumber, setSeatNumber] = useState('FAUTEUIL 01 • RANG OR');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cinema-card rounded-2xl p-6 md:p-8 border border-yellow-500/30 text-white relative">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 font-cinzel font-bold text-xl">
            <Ticket className="w-6 h-6" />
            BILLETTERIE & PASS VIP PREMIÈRE
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Personnalisez votre invitation coupe-file officielle pour le tapis rouge !
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer font-cinzel"
          >
            <Printer className="w-4 h-4" />
            Imprimer mon Pass
          </button>
        </div>
      </div>

      {/* Guest Name Input Bar */}
      <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
            Nom de l'invité sur le billet :
          </label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Ex: Sarah & Thomas"
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-yellow-400 font-bold focus:border-yellow-500 focus:outline-none"
          />
        </div>

        <div className="flex-1 min-w-[160px]">
          <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
            Place / Catégorie :
          </label>
          <input
            type="text"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            placeholder="Ex: Loge Présidentielle"
            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-white focus:border-yellow-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Printable / Realistic Cinema Ticket */}
      <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border-2 border-yellow-500/50 shadow-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black relative">
        {/* Decorative Ticket Perforation Dots */}
        <div className="hidden sm:block absolute top-0 bottom-0 right-48 w-0.5 border-r-2 border-dashed border-yellow-500/40 z-10" />

        <div className="flex flex-col sm:flex-row">
          {/* Main Ticket Body */}
          <div className="flex-1 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-300 font-mono text-[10px] uppercase font-bold border border-yellow-500/30">
                ★ ENTRÉE COUPE-FILE VIP ★
              </span>
              <span className="text-[10px] font-mono text-gray-400 uppercase">
                SÉRIE #779-{star.age}
              </span>
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-yellow-400 font-mono">
                PREMIÈRE MONDIALE DU FILM
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white tracking-wider gold-glow">
                {star.movieTitle.toUpperCase()}
              </h3>
              <p className="text-xs text-gray-400 font-playfair italic mt-0.5">
                Célébration des {star.age} ans de {star.name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800 text-xs font-mono">
              <div>
                <span className="text-gray-500 block text-[10px]">TITULAIRE DU BILLET</span>
                <span className="text-yellow-400 font-bold uppercase truncate block">
                  {guestName || 'INVITÉ VIP'}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">ATTRIBUTION</span>
                <span className="text-white font-semibold truncate block">
                  {seatNumber}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">DATE & HEURE</span>
                <span className="text-gray-200">{star.partyDate}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px]">DRESS CODE</span>
                <span className="text-gray-200">Chic & Tapis Rouge</span>
              </div>
            </div>

            <div className="text-[10px] text-gray-500 pt-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-yellow-500" />
              <span>Valable pour 1 entrée avec accès illimité au buffet, champagne et surprises.</span>
            </div>
          </div>

          {/* Ticket Stub (Tear-off right section) */}
          <div className="w-full sm:w-48 bg-zinc-950 p-6 flex flex-col justify-between items-center border-t sm:border-t-0 sm:border-l border-zinc-800 text-center">
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-mono text-yellow-400 tracking-wider">
                STUB D'ENTRÉE
              </div>
              <div className="text-lg font-bold font-cinzel text-white">
                {star.name.toUpperCase()}
              </div>
              <div className="text-[10px] text-gray-400">
                {star.age} ANS
              </div>
            </div>

            {/* Stylized Barcode */}
            <div className="my-4 py-2 px-3 bg-white rounded flex items-center justify-center gap-1 w-full max-w-[140px]">
              {[2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 1, 4, 2, 3, 1, 5, 2, 1, 4, 3].map((h, i) => (
                <div
                  key={i}
                  className="bg-black"
                  style={{
                    width: `${(h % 3) + 1}px`,
                    height: '28px'
                  }}
                />
              ))}
            </div>

            <div className="text-[9px] font-mono text-gray-500">
              ADMIT ONE • NO REFUNDS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
