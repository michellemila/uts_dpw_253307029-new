/* FORM VALIDATION & TOAST NOTIFICATION */

document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('formDaftar');
    const namaInput = document.getElementById('nama');
    const nikInput = document.getElementById('nik');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            kirim();
        });
    }
    
    if (nikInput) {
        nikInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/\D/g, '');
        });
    }
    
    if (namaInput) {
        namaInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    }
});

function kirim() {
    const nama = document.getElementById('nama').value.trim();
    const nik = document.getElementById('nik').value.trim();
    const jalur = document.getElementById('jalur').value;
    const jalurText = document.getElementById('jalur').options[document.getElementById('jalur').selectedIndex].text;
    
    if (nama === '') {
        showToast('❌ Nama lengkap wajib diisi!', 'error');
        document.getElementById('nama').focus();
        return;
    }
    
    if (nik === '') {
        showToast('❌ NIK wajib diisi!', 'error');
        document.getElementById('nik').focus();
        return;
    }
    
    if (nik.length !== 16) {
        showToast('❌ NIK harus 16 digit!', 'error');
        document.getElementById('nik').focus();
        return;
    }
    
    if (jalur === '') {
        showToast('❌ Silakan pilih jalur pendaftaran!', 'error');
        document.getElementById('jalur').focus();
        return;
    }
    
    const btn = document.querySelector('button[type="submit"]');
    btn.innerText = '⏳ Mengirim...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
        const noPendaftaran = 'PPDB-' + Date.now().toString().slice(-6);
        const tanggal = new Date().toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
        
        document.getElementById('formDaftar').style.display = 'none';
        tampilkanStatusBerhasil(nama, nik, jalurText, noPendaftaran, tanggal);
        showToast('✅ Pendaftaran berhasil!', 'success');
        
    }, 1500);
}

function tampilkanStatusBerhasil(nama, nik, jalur, noPendaftaran, tanggal) {
    const main = document.querySelector('main');
    
    const statusDiv = document.createElement('div');
    statusDiv.id = 'statusBerhasil';
    statusDiv.innerHTML = `
        <div class="success-container">
            <div class="success-icon">✓</div>
            <h2>Pendaftaran Berhasil!</h2>
            <p class="success-message">Data Anda telah berhasil terdaftar</p>
            
            <div class="detail-box">
                <h3>Detail Pendaftaran</h3>
                <div class="detail-item">
                    <span class="label">No. Pendaftaran:</span>
                    <span class="value highlight">${noPendaftaran}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Nama:</span>
                    <span class="value">${nama}</span>
                </div>
                <div class="detail-item">
                    <span class="label">NIK:</span>
                    <span class="value">${nik.replace(/(\d{4})(?=\d)/g, '$1 ')}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Jalur:</span>
                    <span class="value">${jalur}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Tanggal:</span>
                    <span class="value">${tanggal}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Status:</span>
                    <span class="value status-badge">Menunggu Verifikasi</span>
                </div>
            </div>
            
            <div class="info-box">
                <p>📧 Cek email untuk konfirmasi lebih lanjut</p>
                <p>📱 Simpan nomor pendaftaran Anda</p>
            </div>
            
            <div class="button-group">
                <button onclick="cetakBukti()" class="btn-cetak">🖨️ Cetak Bukti</button>
                <button onclick="daftarUlang()" class="btn-daftar-lagi">Daftar Lagi</button>
            </div>
        </div>
    `;
    
    main.appendChild(statusDiv);
    
    setTimeout(() => {
        statusDiv.style.opacity = '1';
        statusDiv.style.transform = 'translateY(0)';
    }, 100);
}

function daftarUlang() {
    document.getElementById('statusBerhasil').remove();
    const form = document.getElementById('formDaftar');
    form.reset();
    form.style.display = 'flex';
    
    const btn = document.querySelector('button[type="submit"]');
    btn.innerText = 'Kirim Pendaftaran';
    btn.disabled = false;
    btn.style.opacity = '1';
}

function cetakBukti() {
    window.print();
}

function showToast(message, type) {
    const toast = document.getElementById('toast');
    
    toast.style.background = type === 'success' 
        ? 'linear-gradient(135deg, #10b981, #059669)' 
        : 'linear-gradient(135deg, #ef4444, #dc2626)';
    
    toast.innerText = message;
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// Styles
const style = document.createElement('style');
style.innerHTML = `
    #statusBerhasil { opacity: 0; transform: translateY(20px); transition: all 0.5s ease; }
    .success-container { text-align: center; padding: 20px; }
    .success-icon { width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669); 
        border-radius: 50%; display: flex; align-items: center; justify-content: center; 
        font-size: 40px; color: white; margin: 0 auto 20px; animation: scaleIn 0.5s ease; }
    @keyframes scaleIn { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
    .success-container h2 { color: #10b981; margin-bottom: 10px; }
    .detail-box { background: rgba(255,255,255,0.05); border-radius: 15px; padding: 25px; 
        margin: 20px 0; border: 1px solid rgba(16, 185, 129, 0.3); text-align: left; }
    .detail-box h3 { color: #00c6ff; margin-bottom: 20px; text-align: center; 
        border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; }
    .detail-item { display: flex; justify-content: space-between; padding: 12px 0; 
        border-bottom: 1px solid rgba(255,255,255,0.05); }
    .label { color: #94a3b8; }
    .value { color: #fff; font-weight: 600; }
    .value.highlight { color: #00c6ff; font-size: 18px; }
    
    .status-badge { background: linear-gradient(135deg, #f59e0b, #d97706); 
        padding: 5px 15px; border-radius: 20px; font-size: 12px; color: white; }
    .info-box { background: rgba(0, 198, 255, 0.1); border-left: 4px solid #00c6ff; 
        padding: 15px 20px; margin: 20px 0; border-radius: 0 10px 10px 0; text-align: left; }
    .button-group { display: flex; gap: 15px; justify-content: center; margin-top: 25px; }
    .btn-cetak { background: linear-gradient(135deg, #00c6ff, #0072ff); padding: 12px 25px; 
        border-radius: 25px; border: none; color: white; cursor: pointer; }
    .btn-daftar-lagi { background: rgba(255,255,255,0.1); padding: 12px 25px; 
        border-radius: 25px; border: 1px solid rgba(255,255,255,0.2); color: white; cursor: pointer; }
`;
document.head.appendChild(style);