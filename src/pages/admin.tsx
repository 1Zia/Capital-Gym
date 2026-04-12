import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Upload, LogOut, Palette, Image, Eye, EyeOff, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { useSite, ThemeColors } from '@/contexts/site-context';
import { SEO } from '@/components/seo';

const ADMIN_PIN = 'capitaladmin';
const SESSION_KEY = 'tcg_admin_authed';

function Toast({ msg, ok }: { msg: string; ok: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 border font-bold text-sm tracking-wider ${ok ? 'bg-green-900/90 border-green-500 text-green-200' : 'bg-red-900/90 border-red-500 text-red-200'}`}
    >
      {ok ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      {msg}
    </motion.div>
  );
}

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pin, setPin] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onAuth();
    } else {
      setError('Incorrect password. Try again.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <SEO title="Admin Login" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-display tracking-wider text-foreground mb-1">
            THE <span className="text-primary">CAPITAL</span> GYM
          </h1>
          <div className="w-16 h-1 bg-primary mx-auto mt-3" />
          <p className="text-muted-foreground text-xs tracking-widest uppercase mt-4">Admin Access</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              autoFocus
              className="w-full bg-secondary border border-border text-foreground px-4 py-4 pr-12 font-sans text-base outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs tracking-wider text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-display text-2xl tracking-widest py-4 hover:opacity-90 transition-opacity mt-2"
          >
            ENTER
          </button>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default function AdminPage() {
  const { adminImages, addAdminImage, removeAdminImage, themeColors, setThemeColors, resetTheme } = useSite();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [activeTab, setActiveTab] = useState<'gallery' | 'theme'>('gallery');
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    let success = 0;
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      try {
        await addAdminImage(file);
        success++;
      } catch {
        showToast(`Failed to upload ${file.name}`, false);
      }
    }
    setUploading(false);
    if (success > 0) showToast(`${success} photo${success > 1 ? 's' : ''} uploaded to gallery`);
  }, [addAdminImage]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (id: string) => {
    removeAdminImage(id);
    showToast('Photo removed from gallery');
  };

  const handleThemeSave = () => {
    showToast('Theme saved — changes are live!');
  };

  const handleThemeReset = () => {
    resetTheme();
    showToast('Theme reset to defaults');
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  if (!authed) {
    return <PasswordGate onAuth={() => setAuthed(true)} />;
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <SEO title="Admin Dashboard" />
      <AnimatePresence>{toast && <Toast msg={toast.msg} ok={toast.ok} />}</AnimatePresence>

      <div className="container mx-auto px-4 md:px-8 py-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-12 gap-4 flex-wrap">
          <div>
            <h1 className="text-5xl md:text-7xl font-display text-foreground leading-none uppercase">
              ADMIN <span className="text-primary">PANEL</span>
            </h1>
            <div className="w-16 h-1 bg-primary mt-3" />
            <p className="text-muted-foreground text-sm tracking-wider mt-2 uppercase">The Capital Gym — Website Control</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground px-4 py-2 text-sm transition-colors font-bold tracking-wider"
          >
            <LogOut size={16} />
            LOGOUT
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-10">
          {([
            { id: 'gallery', label: 'GALLERY PHOTOS', icon: Image },
            { id: 'theme', label: 'THEME COLOURS', icon: Palette },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-4 font-display text-lg tracking-wider border-b-2 transition-colors ${activeTab === id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h2 className="text-3xl font-display tracking-wider text-foreground mb-2">MANAGE GALLERY</h2>
              <p className="text-muted-foreground text-sm">Upload new photos to add them to the public gallery page. Photos are stored in your browser.</p>
            </div>

            {/* Upload zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center py-16 mb-10 ${dragging ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground bg-secondary/40'}`}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <Upload size={40} className={`mb-4 ${dragging ? 'text-primary' : 'text-muted-foreground'}`} />
              <p className={`font-display text-2xl tracking-wider mb-2 ${dragging ? 'text-primary' : 'text-foreground'}`}>
                {uploading ? 'UPLOADING...' : 'DRAG & DROP OR CLICK TO UPLOAD'}
              </p>
              <p className="text-muted-foreground text-sm">Supports JPG, PNG, WEBP — multiple files allowed</p>
            </div>

            {/* Admin-uploaded images grid */}
            {adminImages.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border">
                <Image size={48} className="mx-auto mb-4 text-muted-foreground opacity-40" />
                <p className="text-muted-foreground font-display text-xl tracking-wider">NO PHOTOS UPLOADED YET</p>
                <p className="text-muted-foreground text-sm mt-2">Photos you upload here will appear in the Gallery page.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl tracking-wider text-foreground">{adminImages.length} UPLOADED PHOTO{adminImages.length !== 1 ? 'S' : ''}</h3>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">These appear at the end of the public gallery</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {adminImages.map((img, i) => (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="relative group aspect-square overflow-hidden border border-border bg-secondary"
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                        <p className="text-xs text-foreground text-center font-bold line-clamp-2">{img.alt}</p>
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 text-xs font-bold tracking-wider transition-colors"
                        >
                          <Trash2 size={12} />
                          DELETE
                        </button>
                      </div>
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5">
                        NEW
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-8">
              <h2 className="text-3xl font-display tracking-wider text-foreground mb-2">THEME COLOURS</h2>
              <p className="text-muted-foreground text-sm">Customise the primary and accent colours used throughout the entire website. Changes apply instantly across all pages and are auto-saved in your browser.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Primary colour */}
              <div className="border border-border bg-secondary p-8">
                <h3 className="font-display text-xl tracking-wider text-foreground mb-1">PRIMARY COLOUR</h3>
                <p className="text-muted-foreground text-xs mb-6 tracking-wider">Used for buttons, highlights, and key accents. Default: red (#FF3D2E)</p>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div
                      className="w-20 h-20 border-4 border-border cursor-pointer shadow-inner"
                      style={{ backgroundColor: themeColors.primaryHex }}
                      onClick={() => document.getElementById('picker-primary')?.click()}
                    />
                    <input
                      id="picker-primary"
                      type="color"
                      value={themeColors.primaryHex}
                      onChange={(e) => setThemeColors({ ...themeColors, primaryHex: e.target.value })}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-bold text-lg">{themeColors.primaryHex.toUpperCase()}</p>
                    <p className="text-muted-foreground text-xs mt-1">Click the swatch to open the colour picker</p>
                    <button
                      onClick={() => setThemeColors({ ...themeColors, primaryHex: '#FF3D2E' })}
                      className="mt-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={12} />
                      Reset to default red
                    </button>
                  </div>
                </div>
                {/* Live preview */}
                <div className="mt-6 flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground tracking-wider uppercase">Live Preview</p>
                  <div className="flex gap-3 flex-wrap items-center">
                    <button className="font-display text-lg tracking-wider px-6 py-2 text-white" style={{ backgroundColor: themeColors.primaryHex }}>
                      JOIN NOW
                    </button>
                    <div className="w-4 h-4" style={{ backgroundColor: themeColors.primaryHex }} />
                    <span className="font-display tracking-wider" style={{ color: themeColors.primaryHex }}>THE CAPITAL GYM</span>
                  </div>
                </div>
              </div>

              {/* Accent colour */}
              <div className="border border-border bg-secondary p-8">
                <h3 className="font-display text-xl tracking-wider text-foreground mb-1">ACCENT COLOUR</h3>
                <p className="text-muted-foreground text-xs mb-6 tracking-wider">Used for stars, badges, and secondary highlights. Default: yellow (#FFD600)</p>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div
                      className="w-20 h-20 border-4 border-border cursor-pointer shadow-inner"
                      style={{ backgroundColor: themeColors.accentHex }}
                      onClick={() => document.getElementById('picker-accent')?.click()}
                    />
                    <input
                      id="picker-accent"
                      type="color"
                      value={themeColors.accentHex}
                      onChange={(e) => setThemeColors({ ...themeColors, accentHex: e.target.value })}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-bold text-lg">{themeColors.accentHex.toUpperCase()}</p>
                    <p className="text-muted-foreground text-xs mt-1">Click the swatch to open the colour picker</p>
                    <button
                      onClick={() => setThemeColors({ ...themeColors, accentHex: '#FFD600' })}
                      className="mt-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw size={12} />
                      Reset to default yellow
                    </button>
                  </div>
                </div>
                {/* Live preview */}
                <div className="mt-6 flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground tracking-wider uppercase">Live Preview</p>
                  <div className="flex gap-3 flex-wrap items-center">
                    <span className="font-bold text-2xl" style={{ color: themeColors.accentHex }}>4.5★</span>
                    <span className="text-xs text-muted-foreground">Google Reviews</span>
                    <div className="w-4 h-4" style={{ backgroundColor: themeColors.accentHex }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview bar */}
            <div className="border border-border bg-[#0A0A0A] p-6 mb-8">
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">Full Colour Preview</p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="h-8 flex-1 min-w-[80px]" style={{ backgroundColor: themeColors.primaryHex }} />
                <div className="h-8 flex-1 min-w-[80px]" style={{ backgroundColor: themeColors.accentHex }} />
                <div className="h-8 flex-1 min-w-[80px] bg-[#0A0A0A] border border-white/10" />
                <div className="h-8 flex-1 min-w-[80px] bg-[#141414]" />
              </div>
              <div className="flex gap-2 mt-3 text-xs text-muted-foreground">
                <span className="flex-1 text-center">Primary</span>
                <span className="flex-1 text-center">Accent</span>
                <span className="flex-1 text-center">Background</span>
                <span className="flex-1 text-center">Card</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={handleThemeSave}
                className="font-display text-xl tracking-widest px-10 py-4 text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: themeColors.primaryHex }}
              >
                SAVE THEME
              </button>
              <button
                onClick={handleThemeReset}
                className="flex items-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground px-8 py-4 font-bold tracking-wider text-sm transition-colors"
              >
                <RotateCcw size={16} />
                RESET TO DEFAULTS
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Note: Colour changes apply instantly and are auto-saved in your browser. Visitors on other devices always see the default red/yellow colours.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
