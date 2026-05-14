import { useState, useEffect, useRef, useCallback } from 'react';
import './Meme.css';

function Meme() {
    const [tab, setTab] = useState("editor");
    const [image, setImage] = useState(null);
    const [text, setText] = useState([
        { id: 1, text: "TEXTE DU HAUT", x: 0.5, y: 0.08, fontSize: 48, color: "#FFFFFF", stroke: "#000000", font: "Impact", align: "center" },
        { id: 2, text: "TEXTE DU BAS", x: 0.5, y: 0.92, fontSize: 48, color: "#FFFFFF", stroke: "#000000", font: "Impact", align: "center" }
    ]);
    const [selectedId, setSelectedId] = useState(1);
    const [gallery, setGallery] = useState([]);
    const [dragging, setDragging] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragOver, setIsDragOver] = useState(false);
    const canvasRef = useRef(null);
    // const previewRef = useRef(null);
    const fileInputRef = useRef(null);
    const imgRef = useRef(null);

    const selected = (Array.isArray(text) ? text.find(t => t.id === selectedId) : null) || { x: 50, y: 50, text: "Your Text Here", fontSize: 20, color: "#000000" };

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (imgRef.current && image) {
            ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = "#ccc";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";
            ctx.font = "20px Arial";
            ctx.fillText("No Image", canvas.width / 2, canvas.height / 2);
        }
        text.forEach(t => {
            const f = t.fontSize * (canvas.width / 500);
            ctx.font = `${f}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.lineWidth = f * 0.08;
            ctx.strokeStyle = t.stroke;
            ctx.lineJoin = "round";
            const x = t.x * canvas.width;
            const y = t.y * canvas.height;
            ctx.strokeText(t.text, x, y);
            ctx.fillStyle = t.color;
            ctx.fillText(t.text, x, y);
        });

    }, [image, text]);

    useEffect(() => {
        draw();
    }, [draw]);

    const loadImage = (file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            imgRef.current = img;
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = img.width;
                canvas.height = img.height;
                draw();
            }
            setImage(url);
        };
        img.src = url;
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        loadImage(file);
    };

    const getCanvaPos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        return { x, y };
    };

    const handleMouseDown = (e) => {
        const pos = getCanvaPos(e);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        for (let i = text.length - 1; i >= 0; i--) {
            const t = text[i];
            const f = t.fontSize * (canvas.width / 500);
            ctx.font = `${f}px Arial`;
            const w = ctx.measureText(t.text).width / canvas.width;
            const h = f / canvas.height;
            if (pos.x >= t.x - w / 2 && pos.x <= t.x + w / 2 && pos.y >= t.y - h / 2 && pos.y <= t.y + h / 2) {
                setSelectedId(t.id);
                setDragging(t.id);
                setDragOffset({ x: pos.x - t.x, y: pos.y - t.y });
                return;
            }
        }
        setSelectedId(null);
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        const pos = getCanvaPos(e);
        setText(text.map(t => t.id === dragging ? { ...t, x: pos.x - dragOffset.x, y: pos.y - dragOffset.y } : t));
    };

    const handleMouseUp = () => {
        setDragging(null);
    };

    const updateSelected = (key, value) => {
        setText(prev => prev.map(t => t.id === selectedId ? { ...t, [key]: value } : t));
    };

    const addText = () => {
        const newText = { id: Date.now(), text: "New Text", x: 0.5, y: 0.5, fontSize: 48, color: "#FFFFFF", stroke: "#000000", font: "Impact", align: "center" };
        setText(prev => [...prev, newText]);
        setSelectedId(newText.id);
    };

    const removeSelected = () => {
        setText(prev => prev.filter(t => t.id !== selectedId));
        setSelectedId(null);
    };

    const saveMeme = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/png');
        setGallery(prev => [{ id: uid(), url: dataUrl, date: new Date().toLocaleString("fr-FR") }, ...prev]);
        setTab("gallery");
    };

    const uid = () => Math.random().toString(36).substr(2, 9);

    const downloadMeme = (url, name = "meme.png") => {
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
    };

    const shareNative = async (url) => {
        if (navigator.share) {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                const file = new File([blob], "meme.png", { type: blob.type });
                await navigator.share({
                    title: "Check out my meme!",
                    files: [file],
                });
            } catch {
                alert("Sharing failed. Copying link to clipboard instead.");
                navigator.clipboard.writeText(window.location.origin + url);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="meme-container">
        {/* Navigation */}
        <nav className="meme-nav">
            <button 
            className={`nav-btn ${tab === 'editor' ? 'active' : ''}`}
            onClick={() => setTab('editor')}
            >
            🎨 Éditeur
            </button>
            <button 
            className={`nav-btn ${tab === 'gallery' ? 'active' : ''}`}
            onClick={() => setTab('gallery')}
            >
            🖼️ Galerie
            </button>
        </nav>

        {tab === 'editor' ? (
            <main className="meme-main">
            {/* Gauche : Zone de travail */}
            <section 
                className="canvas-section"
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleFileDrop}
            >
                {!image && <div className="no-image-text">Glissez une image ici ou cliquez sur Importer</div>}
                {isDragOver && <div className="dropzone-overlay">Relâchez pour importer</div>}
                
                <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                />
            </section>

            {/* Droite : Outils */}
            <aside className="tools-panel">
                <div className="tool-group">
                <button className="btn-secondary" onClick={() => fileInputRef.current.click()}>
                    📁 Importer Image
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    onChange={(e) => loadImage(e.target.files[0])} 
                />
                </div>

                <div className="tool-group">
                <label>Texte</label>
                <button className="btn-primary" onClick={addText}>+ Ajouter du texte</button>
                </div>

                {selectedId && (
                <div className="tool-group" style={{borderTop: '1px solid #334155', pt: 20}}>
                    <label>Modifier la sélection</label>
                    <input 
                    type="text" 
                    value={selected.text} 
                    onChange={(e) => updateSelected('text', e.target.value)} 
                    placeholder="Votre texte..."
                    />
                    
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                    <div>
                        <label>Taille</label>
                        <input 
                        type="number" 
                        value={selected.fontSize} 
                        onChange={(e) => updateSelected('fontSize', parseInt(e.target.value))} 
                        />
                    </div>
                    <div>
                        <label>Couleur</label>
                        <input 
                        type="color" 
                        value={selected.color} 
                        onChange={(e) => updateSelected('color', e.target.value)} 
                        />
                    </div>
                    </div>

                    <button className="btn-danger" onClick={removeSelected}>Supprimer le texte</button>
                </div>
                )}

                <button className="btn-primary" style={{marginTop: 'auto', background: '#10b981'}} onClick={saveMeme}>
                💾 Enregistrer le Mème
                </button>
            </aside>
            </main>
        ) : (
            <div className="gallery-grid">
            {gallery.map(m => (
                <div key={m.id} className="meme-card">
                <img src={m.url} alt="Meme" />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <small>{m.date}</small>
                    <div style={{display: 'flex', gap: '5px'}}>
                    <button className="btn-secondary" onClick={() => downloadMeme(m.url)}>📥</button>
                    <button className="btn-secondary" onClick={() => shareNative(m.url)}>🔗</button>
                    </div>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );

} export default Meme