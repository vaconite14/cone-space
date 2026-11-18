window.OFFICE_DATA = {
  updated: "2026-11-18 17:00",
  tasks: [
    { id: "T001", title: "Koukie: pelajari sheet STOCK KOUKIE & susun SOP input stok", agent: "manager", status: "selesai",
      platform: "Google Sheets", deadline: "2026-11-18", output: "klien/koukie/docs/sop-input-stok.md", notes: "Izin tulis: hanya tab BARANG MASUK & BARANG KELUAR" },
    { id: "T002", title: "Koukie: uji SOP input stok dengan model haiku (dry run, tanpa menulis)", agent: "keuangan", status: "selesai",
      platform: "Google Sheets", deadline: "2026-11-18", output: "klien/koukie/docs/sop-input-stok.md", notes: "Lolos: berhenti benar karena stok ELENA PINK 6 di GUDANG cuma 1" }
  ],
  log: [
    { time: "2026-11-18 17:00", agent: "keuangan", text: "Dry run SOP stok Koukie (haiku) lolos; posisi terakhir BARANG KELUAR = baris 688" },
    { time: "2026-11-18 16:40", agent: "manager", text: "Folder klien Koukie + SOP input stok dibuat; izin edit BARANG MASUK/KELUAR dicatat" }
  ]
};
