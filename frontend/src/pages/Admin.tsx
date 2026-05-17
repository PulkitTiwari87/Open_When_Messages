import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Letter {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  isOpened: boolean;
  unlockDate: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingLetterId, setEditingLetterId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '', slug: '', subtitle: '', message: '', unlockDate: '',
    heroImage: '', galleryImage1: '', galleryImage2: '',
    galleryText1: '', galleryText2: '',
    emotionalQuote: '', endingMessage: '', audioUrl: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchLetters();
  }, [navigate]);

  const fetchLetters = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/letters');
      const data = await response.json();
      setLetters(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: uploadFormData
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData(prev => ({ ...prev, [field]: data.url }));
      } else {
        alert('Upload failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Upload error', err);
      alert('Upload failed');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const url = editingLetterId 
      ? `http://localhost:5000/api/letters/${editingLetterId}`
      : 'http://localhost:5000/api/letters';
      
    const method = editingLetterId ? 'PUT' : 'POST';

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        subtitle: formData.subtitle,
        message: formData.message,
        unlockDate: new Date(formData.unlockDate),
        heroImage: formData.heroImage,
        galleryImages: [formData.galleryImage1, formData.galleryImage2].filter(Boolean),
        galleryTexts: [formData.galleryText1, formData.galleryText2],
        emotionalQuote: formData.emotionalQuote,
        endingMessage: formData.endingMessage,
        audioUrl: formData.audioUrl
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setIsCreating(false);
        setEditingLetterId(null);
        fetchLetters();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  if (isLoading) {
    return <div className="min-h-screen bg-[#0a0a0a] flex justify-center items-center font-display-editorial text-2xl text-[#C5A059]">Loading Vault...</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen bg-[#0a0a0a] text-cream pt-32 pb-20 px-4 md:px-10 relative"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-display-editorial text-4xl text-[#C5A059]">Vault Dashboard</h1>
          <button onClick={logout} className="font-label-caps text-xs text-red-400 tracking-widest hover:text-red-300">LOGOUT</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1c1815] border border-[#2a211e] p-8 rounded-sm hover:border-[#C5A059]/50 transition-colors cursor-pointer" onClick={() => setIsCreating(true)}>
            <h3 className="font-label-caps text-xs uppercase tracking-widest text-[#C5A059] mb-4">Manage Letters</h3>
            <p className="text-sm text-[#eae1d6]/50 mb-8 leading-relaxed font-body-sm">Create, edit, or delete the letters in the 'Open When' vault. Schedule unlocks and attach voice notes.</p>
            <div className="px-6 py-3 border border-[#C5A059] text-[10px] uppercase tracking-[0.2em] text-[#C5A059] hover:bg-[#C5A059]/20 transition-colors w-full text-center">Create New Letter</div>
          </div>
          
          <div className="bg-[#1c1815] border border-[#2a211e] p-8 rounded-sm hover:border-[#C5A059]/50 transition-colors cursor-pointer">
            <h3 className="font-label-caps text-xs uppercase tracking-widest text-[#C5A059] mb-4">Gallery Vault</h3>
            <p className="text-sm text-[#eae1d6]/50 mb-8 leading-relaxed font-body-sm">Upload new polaroids, cinematic videos, and memories to the visual gallery. Add handwritten captions.</p>
            <div className="px-6 py-3 border border-[#C5A059] text-[10px] uppercase tracking-[0.2em] text-[#C5A059] hover:bg-[#C5A059]/20 transition-colors w-full text-center">Upload Media</div>
          </div>
          
          <div className="bg-[#1c1815] border border-[#2a211e] p-8 rounded-sm hover:border-[#C5A059]/50 transition-colors cursor-pointer">
            <h3 className="font-label-caps text-xs uppercase tracking-widest text-[#C5A059] mb-4">Our Story Timeline</h3>
            <p className="text-sm text-[#eae1d6]/50 mb-8 leading-relaxed font-body-sm">Add new milestones and emotional moments to the storytelling timeline. Adjust parallax effects.</p>
            <div className="px-6 py-3 border border-[#C5A059] text-[10px] uppercase tracking-[0.2em] text-[#C5A059] hover:bg-[#C5A059]/20 transition-colors w-full text-center">Edit Storyline</div>
          </div>
        </div>
        
        <div className="mt-12 bg-[#1c1815] border border-[#2a211e] p-8 rounded-sm">
          <h3 className="font-label-caps text-xs uppercase tracking-widest text-[#C5A059] mb-6">Active Letters in Vault</h3>
          <div className="space-y-4">
            {letters.length === 0 ? (
              <p className="text-[#eae1d6]/40 font-body-sm italic">No letters found. Create the first one.</p>
            ) : (
              letters.map((letter) => (
                <div key={letter._id} className="flex justify-between items-center py-4 border-b border-[#2a211e] group">
                  <div>
                    <div className="font-display-editorial text-2xl text-[#eae1d6]">{letter.title}</div>
                    <div className="font-body-sm text-xs text-[#eae1d6]/40 mt-1">{letter.subtitle}</div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="flex flex-col items-end">
                      <span className={`font-label-caps text-[10px] px-2 py-1 border ${letter.isOpened ? 'border-green-500/30 text-green-500' : 'border-[#C5A059]/30 text-[#C5A059]'} rounded-sm tracking-widest`}>
                        {letter.isOpened ? 'OPENED' : 'SEALED'}
                      </span>
                      <span className="font-body-sm text-[10px] text-[#eae1d6]/40 mt-2">Unlocks: {new Date(letter.unlockDate).toLocaleDateString()}</span>
                    </div>
                    <button 
                      onClick={async () => {
                        // Fetch the full letter content to get the message since the list endpoint excludes it
                        const token = localStorage.getItem('token');
                        const res = await fetch(`http://localhost:5000/api/letters/${letter.slug}`, {
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        const fullLetter = await res.json();
                        
                        setEditingLetterId(letter._id);
                        setFormData({
                          title: fullLetter.title || '',
                          slug: fullLetter.slug || '',
                          subtitle: fullLetter.subtitle || '',
                          message: fullLetter.message === 'Locked' ? '' : (fullLetter.message || ''),
                          unlockDate: fullLetter.unlockDate ? new Date(fullLetter.unlockDate).toISOString().slice(0, 16) : '',
                          heroImage: fullLetter.heroImage || '',
                          galleryImage1: fullLetter.galleryImages?.[0] || '',
                          galleryImage2: fullLetter.galleryImages?.[1] || '',
                          galleryText1: fullLetter.galleryTexts?.[0] || '',
                          galleryText2: fullLetter.galleryTexts?.[1] || '',
                          emotionalQuote: fullLetter.emotionalQuote || '',
                          endingMessage: fullLetter.endingMessage || '',
                          audioUrl: fullLetter.audioUrl || ''
                        });
                        setIsCreating(true);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#C5A059] hover:text-white flex items-center justify-center p-2"
                    >
                      <span className="material-symbols-outlined text-xl">edit</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto"
          >
            <div className="bg-[#1c1815] border border-[#C5A059]/30 w-full max-w-2xl p-8 rounded-sm shadow-2xl relative my-8">
              <button onClick={() => { setIsCreating(false); setEditingLetterId(null); }} className="absolute top-4 right-4 text-[#eae1d6]/50 hover:text-[#C5A059]">
                <span className="material-symbols-outlined">close</span>
              </button>
              <h2 className="font-display-editorial text-3xl text-[#C5A059] mb-6">{editingLetterId ? 'Edit Letter' : 'Draft New Letter'}</h2>
              
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Title</label>
                    <input type="text" required value={formData.title} className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div>
                    <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Slug (URL)</label>
                    <input type="text" required value={formData.slug} className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, slug: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Subtitle</label>
                    <input type="text" value={formData.subtitle} className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                  </div>
                  <div>
                    <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Unlock Date</label>
                    <input type="datetime-local" required value={formData.unlockDate} className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, unlockDate: e.target.value})} />
                  </div>
                </div>
                
                <div>
                  <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Hero Image (URL or Upload)</label>
                  <div className="flex gap-2">
                    <input type="text" value={formData.heroImage} placeholder="https://..." className="flex-1 bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, heroImage: e.target.value})} />
                    <label className="bg-[#2a211e] hover:bg-[#39342d] border border-[#39342d] px-4 flex items-center justify-center cursor-pointer transition-colors text-[#C5A059]">
                      <span className="material-symbols-outlined text-xl">upload</span>
                      <input type="file" className="hidden" accept="image/*" onChange={e => handleFileUpload(e, 'heroImage')} />
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Gallery Media 1 (URL or Upload)</label>
                    <div className="flex gap-2">
                      <input type="text" value={formData.galleryImage1} placeholder="https://..." className="flex-1 bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, galleryImage1: e.target.value})} />
                      <label className="bg-[#2a211e] hover:bg-[#39342d] border border-[#39342d] px-4 flex items-center justify-center cursor-pointer transition-colors text-[#C5A059]">
                        <span className="material-symbols-outlined text-xl">upload</span>
                        <input type="file" className="hidden" accept="image/*,video/*" onChange={e => handleFileUpload(e, 'galleryImage1')} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Gallery Media 2 (URL or Upload)</label>
                    <div className="flex gap-2">
                      <input type="text" value={formData.galleryImage2} placeholder="https://..." className="flex-1 bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, galleryImage2: e.target.value})} />
                      <label className="bg-[#2a211e] hover:bg-[#39342d] border border-[#39342d] px-4 flex items-center justify-center cursor-pointer transition-colors text-[#C5A059]">
                        <span className="material-symbols-outlined text-xl">upload</span>
                        <input type="file" className="hidden" accept="image/*,video/*" onChange={e => handleFileUpload(e, 'galleryImage2')} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Gallery Media 1 Caption</label>
                    <input type="text" value={formData.galleryText1} placeholder="our favorite drive" className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, galleryText1: e.target.value})} />
                  </div>
                  <div>
                    <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Gallery Media 2 Caption</label>
                    <input type="text" value={formData.galleryText2} placeholder="quiet mornings" className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, galleryText2: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Emotional Quote (Middle of letter)</label>
                  <input type="text" value={formData.emotionalQuote} className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, emotionalQuote: e.target.value})} />
                </div>

                <div>
                  <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Background Audio (URL or Upload .mp3)</label>
                  <div className="flex gap-2">
                    <input type="text" value={formData.audioUrl} placeholder="https://..." className="flex-1 bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, audioUrl: e.target.value})} />
                    <label className="bg-[#2a211e] hover:bg-[#39342d] border border-[#39342d] px-4 flex items-center justify-center cursor-pointer transition-colors text-[#C5A059]">
                      <span className="material-symbols-outlined text-xl">upload</span>
                      <input type="file" className="hidden" accept="audio/*" onChange={e => handleFileUpload(e, 'audioUrl')} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Letter Message (Use Enter to split paragraphs)</label>
                  <textarea required rows={5} value={formData.message} className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </div>
                
                <div>
                  <label className="font-label-caps text-[10px] text-[#eae1d6]/50 mb-1 block">Ending Message</label>
                  <textarea rows={2} value={formData.endingMessage} className="w-full bg-[#231f18] border border-[#39342d] text-[#eae1d6] p-3 text-sm focus:border-[#C5A059]" onChange={e => setFormData({...formData, endingMessage: e.target.value})}></textarea>
                </div>

                <button type="submit" className="w-full bg-[#C5A059] text-[#0a0a0a] font-label-caps py-4 tracking-[0.2em] hover:bg-white transition-colors">
                  {editingLetterId ? 'UPDATE LETTER' : 'SEAL & SAVE'}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
