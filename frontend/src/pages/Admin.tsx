import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { resolveImage } from '../utils/offlineImages';

interface Letter {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  message: string;
  unlockDate: string;
  heroImage: string;
  galleryImages: string[];
  emotionalQuote: string;
  endingMessage: string;
  audioUrl: string;
  isOpened: boolean;
  theme?: string;
  particlesStyle?: string;
}

const INPUT_CLS =
  'border-b border-[#C5A059]/25 pb-2 bg-transparent text-[#eae1d6] focus:outline-none focus:border-[#C5A059]/60 w-full font-body-sm transition-colors placeholder-[#eae1d6]/20';
const SEC_HDR = 'font-label-caps text-[10px] tracking-[0.3em] text-[#C5A059]/50 mb-4 mt-8';

const EMPTY_FORM = {
  title: '', slug: '', subtitle: '', message: '',
  unlockDate: '', heroImage: '', emotionalQuote: '',
  endingMessage: '', audioUrl: '', theme: 'dark-romantic', particlesStyle: 'none',
};

// ── ImageUploadSlot ──────────────────────────────────────────────────────────
function ImageUploadSlot({
  label, value, onChange, onRemove,
}: {
  label: string; value: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) onChange(data.url);
      else alert('Upload failed: ' + data.message);
    } catch { alert('Upload failed'); }
    finally { setUploading(false); }
  };

  return (
    <div className="mb-4">
      <p className="font-label-caps text-[9px] tracking-[0.2em] text-[#eae1d6]/30 mb-2">{label}</p>
      {value ? (
        <div className="relative group/img w-full h-28">
          <img src={resolveImage(value)} alt={label} className="w-full h-full object-cover opacity-70" />
          <button type="button" onClick={() => onChange('')}
            className="absolute top-1 right-1 bg-black/70 text-red-400 text-xs px-2 py-0.5 opacity-0 group-hover/img:opacity-100 transition-opacity">
            ✕
          </button>
          {onRemove && (
            <button type="button" onClick={onRemove}
              className="absolute bottom-1 right-1 bg-black/70 text-[#eae1d6]/50 text-[9px] px-2 py-0.5 font-label-caps tracking-wider opacity-0 group-hover/img:opacity-100 transition-opacity">
              REMOVE SLOT
            </button>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-[#C5A059]/20 hover:border-[#C5A059]/50 cursor-pointer transition-colors group/upload">
          <span className="material-symbols-outlined text-[#C5A059]/30 group-hover/upload:text-[#C5A059]/70 text-2xl">
            add_photo_alternate
          </span>
          <span className="font-label-caps text-[9px] tracking-[0.2em] text-[#eae1d6]/25 mt-1">
            {uploading ? 'UPLOADING...' : 'CLICK TO UPLOAD'}
          </span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFile} disabled={uploading} />
        </label>
      )}
      {!value && (
        <input
          placeholder="...or paste image URL"
          onChange={e => e.target.value && onChange(e.target.value)}
          className="w-full bg-transparent border-b border-[#39342d] text-[#eae1d6]/50 text-xs font-body-sm py-1 focus:outline-none focus:border-[#C5A059]/30 mt-1 placeholder-[#eae1d6]/20"
        />
      )}
    </div>
  );
}

// ── Admin ────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>(['']);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') { navigate('/login'); return; }
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/letters`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setLetters(await res.json());
    } catch (err) { console.error(err); }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const resetForm = () => {
    setFormData({ ...EMPTY_FORM });
    setGalleryImages(['']);
    setEditingId(null);
    setIsCreating(false);
  };

  const startCreating = () => { resetForm(); setIsCreating(true); };

  const loadForEdit = async (letter: Letter) => {
    // fetch full letter data via slug for complete fields
    try {
      const res = await fetch(`${API_BASE_URL}/api/letters/${letter.slug}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const full = res.ok ? await res.json() : letter;
      setEditingId(full._id || letter._id);
      setIsCreating(false);
      setFormData({
        title: full.title || '',
        slug: full.slug || '',
        subtitle: full.subtitle || '',
        message: full.message === 'Locked' ? '' : (full.message || ''),
        unlockDate: full.unlockDate ? new Date(full.unlockDate).toISOString().slice(0, 16) : '',
        heroImage: full.heroImage || '',
        emotionalQuote: full.emotionalQuote || '',
        endingMessage: full.endingMessage || '',
        audioUrl: full.audioUrl || '',
        theme: full.theme || 'dark-romantic',
        particlesStyle: full.particlesStyle || 'none',
      });
      setGalleryImages(full.galleryImages?.length ? full.galleryImages : ['']);
    } catch { /* fallback already loaded */ }
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    const payload = {
      ...formData,
      unlockDate: new Date(formData.unlockDate),
      galleryImages: galleryImages.filter(Boolean),
    };
    const url = editingId
      ? `${API_BASE_URL}/api/letters/${editingId}`
      : `${API_BASE_URL}/api/letters`;
    const method = editingId ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSaveStatus('saved');
        fetchLetters();
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch { setSaveStatus('idle'); }
  };

  const handleDelete = async () => {
    if (!editingId || !confirm('Delete this letter permanently?')) return;
    await fetch(`${API_BASE_URL}/api/letters/${editingId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    resetForm();
    fetchLetters();
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch(`${API_BASE_URL}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) setFormData(p => ({ ...p, audioUrl: data.url }));
    } catch { alert('Audio upload failed'); }
  };

  const showForm = isCreating || !!editingId;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#16130d] pt-24 pb-16 px-[5vw]"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-12 border-b border-[#39342d] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <h1 className="font-display-editorial text-4xl text-[#C5A059] tracking-tighter">Admin Dashboard</h1>
          </div>
          <p className="font-label-caps text-[10px] tracking-[0.25em] text-[#eae1d6]/30 mt-2">
            THE VAULT — MANAGE YOUR ARCHIVE
          </p>
        </div>
        <button onClick={logout}
          className="font-label-caps text-xs tracking-[0.2em] text-red-500/50 hover:text-red-400 transition-colors border border-red-900/30 px-4 py-2">
          LOGOUT
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12">

        {/* ── LEFT: Letter List ─────────────────────────────────────────── */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="font-label-caps text-[10px] tracking-[0.25em] text-[#eae1d6]/40">
              ALL LETTERS ({letters.length})
            </p>
            <button onClick={startCreating}
              className="font-label-caps text-[10px] tracking-[0.2em] text-[#C5A059] border border-[#C5A059]/30 px-3 py-1 hover:bg-[#C5A059]/10 transition-colors">
              + NEW
            </button>
          </div>

          <div className="space-y-0">
            {letters.map(letter => (
              <div key={letter._id}
                onClick={() => loadForEdit(letter)}
                className={`border-b border-[#39342d] py-4 px-2 cursor-pointer hover:bg-[#1f1b14] transition-colors group ${
                  editingId === letter._id ? 'bg-[#1f1b14] border-l-2 border-l-[#C5A059] pl-4' : ''
                }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-body-sm text-sm text-[#eae1d6]/70 group-hover:text-[#eae1d6] transition-colors">
                      {letter.title}
                    </p>
                    <p className="font-label-caps text-[9px] tracking-[0.15em] text-[#eae1d6]/25 mt-1">
                      {new Date(letter.unlockDate).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric',
                      })}
                    </p>
                  </div>
                  <span className={`font-label-caps text-[8px] tracking-[0.15em] px-2 py-1 border ${
                    letter.isOpened
                      ? 'text-[#C5A059]/60 border-[#C5A059]/20'
                      : 'text-[#eae1d6]/25 border-[#39342d]'
                  }`}>
                    {letter.isOpened ? 'OPENED' : 'SEALED'}
                  </span>
                </div>
              </div>
            ))}
            {letters.length === 0 && (
              <p className="font-label-caps text-[10px] tracking-[0.2em] text-[#eae1d6]/20 py-8 text-center">
                NO LETTERS YET — CREATE ONE →
              </p>
            )}
          </div>
        </div>

        {/* ── RIGHT: Form ───────────────────────────────────────────────── */}
        {showForm ? (
          <div>
            {/* IDENTITY */}
            <p className={SEC_HDR}>── IDENTITY ──</p>
            <input
              placeholder="Title  e.g. Open When You Miss Me"
              value={formData.title}
              onChange={e => {
                const title = e.target.value;
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                setFormData(p => ({ ...p, title, slug }));
              }}
              className={`${INPUT_CLS} mb-4`}
            />
            <input
              placeholder="Slug (auto)"
              value={formData.slug}
              onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))}
              className={`${INPUT_CLS} mb-4`}
            />
            <input
              placeholder="Subtitle"
              value={formData.subtitle}
              onChange={e => setFormData(p => ({ ...p, subtitle: e.target.value }))}
              className={INPUT_CLS}
            />

            {/* CONTENT */}
            <p className={SEC_HDR}>── CONTENT ──</p>
            <textarea
              placeholder="Message..."
              value={formData.message}
              onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              rows={6}
              className={`${INPUT_CLS} resize-none mb-4`}
            />
            <input
              placeholder="Emotional quote"
              value={formData.emotionalQuote}
              onChange={e => setFormData(p => ({ ...p, emotionalQuote: e.target.value }))}
              className={`${INPUT_CLS} mb-4`}
            />
            <input
              placeholder="Ending message"
              value={formData.endingMessage}
              onChange={e => setFormData(p => ({ ...p, endingMessage: e.target.value }))}
              className={INPUT_CLS}
            />

            {/* TIMING */}
            <p className={SEC_HDR}>── TIMING ──</p>
            <input
              type="datetime-local"
              value={formData.unlockDate}
              onChange={e => setFormData(p => ({ ...p, unlockDate: e.target.value }))}
              className={INPUT_CLS}
            />

            {/* THEME */}
            <p className={SEC_HDR}>── THEME ──</p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-label-caps text-[9px] tracking-[0.2em] text-[#eae1d6]/30 mb-2">MOOD</label>
                <select value={formData.theme}
                  onChange={e => setFormData(p => ({ ...p, theme: e.target.value }))}
                  className="w-full bg-[#110e08] border-b border-[#C5A059]/25 text-[#eae1d6] py-2 focus:outline-none font-body-sm appearance-none">
                  <option value="dark-romantic">Dark Romantic</option>
                  <option value="melancholy">Melancholy</option>
                  <option value="hopeful">Hopeful</option>
                  <option value="warm">Warm</option>
                </select>
              </div>
              <div>
                <label className="block font-label-caps text-[9px] tracking-[0.2em] text-[#eae1d6]/30 mb-2">PARTICLES</label>
                <select value={formData.particlesStyle}
                  onChange={e => setFormData(p => ({ ...p, particlesStyle: e.target.value }))}
                  className="w-full bg-[#110e08] border-b border-[#C5A059]/25 text-[#eae1d6] py-2 focus:outline-none font-body-sm appearance-none">
                  <option value="none">None</option>
                  <option value="dust">Dust</option>
                  <option value="petals">Petals</option>
                  <option value="stars">Stars</option>
                </select>
              </div>
            </div>

            {/* MEDIA */}
            <p className={SEC_HDR}>── MEDIA ──</p>
            <ImageUploadSlot
              label="HERO IMAGE"
              value={formData.heroImage}
              onChange={url => setFormData(p => ({ ...p, heroImage: url }))}
            />

            {galleryImages.map((img, i) => (
              <ImageUploadSlot
                key={i}
                label={`GALLERY ${i + 1}`}
                value={img}
                onChange={url => setGalleryImages(p => p.map((v, j) => j === i ? url : v))}
                onRemove={galleryImages.length > 1
                  ? () => setGalleryImages(p => p.filter((_, j) => j !== i))
                  : undefined}
              />
            ))}
            <button type="button" onClick={() => setGalleryImages(p => [...p, ''])}
              className="font-label-caps text-[10px] tracking-[0.2em] text-[#C5A059]/50 hover:text-[#C5A059] transition-colors mt-2">
              + ADD PHOTO
            </button>

            {/* Audio */}
            <div className="mt-6 flex gap-2 items-end">
              <input
                placeholder="Audio URL (optional)"
                value={formData.audioUrl}
                onChange={e => setFormData(p => ({ ...p, audioUrl: e.target.value }))}
                className={`${INPUT_CLS} flex-1`}
              />
              <label className="border-b border-[#C5A059]/25 pb-2 px-3 cursor-pointer hover:text-[#C5A059] text-[#eae1d6]/40 transition-colors">
                <span className="material-symbols-outlined text-xl">upload</span>
                <input type="file" className="hidden" accept="audio/*" onChange={handleAudioUpload} />
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-10">
              <button
                type="button"
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="flex-1 py-4 bg-[#C5A059] text-[#110e08] font-label-caps text-xs tracking-[0.2em] hover:bg-[#eae1d6] transition-colors duration-500 disabled:opacity-40"
              >
                {saveStatus === 'saving'
                  ? 'SAVING...'
                  : saveStatus === 'saved'
                  ? 'SAVED ✓'
                  : editingId
                  ? 'UPDATE LETTER'
                  : 'CREATE LETTER'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-6 py-4 border border-red-900/40 text-red-500/50 font-label-caps text-xs tracking-[0.2em] hover:text-red-400 hover:border-red-600/50 transition-colors"
                >
                  DELETE
                </button>
              )}
            </div>

            <button type="button" onClick={resetForm}
              className="mt-6 font-label-caps text-[10px] tracking-[0.2em] text-[#eae1d6]/25 hover:text-[#eae1d6]/50 transition-colors">
              ← CANCEL
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 border border-dashed border-[#39342d]">
            <div className="text-center">
              <p className="font-display-editorial text-2xl text-[#eae1d6]/20 tracking-tighter mb-3">
                Select a letter to edit
              </p>
              <p className="font-label-caps text-[9px] tracking-[0.25em] text-[#eae1d6]/15">
                OR CLICK + NEW TO CREATE ONE
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
