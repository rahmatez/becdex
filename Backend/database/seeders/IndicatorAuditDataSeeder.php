<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IndicatorAuditDataSeeder extends Seeder
{
    /**
     * Populate indicators with evidence, verification_method, and regulation
     * sourced from the BECdex_Audit_Checklist.md
     */
    public function run(): void
    {
        $data = [
            1 => [
                'name'                => 'Conformity to Marine Spatial Plans',
                'description'         => 'Perusahaan memiliki bukti bahwa lokasi dan kegiatan usahanya telah sesuai dengan rencana tata ruang dan/atau pemanfaatan ruang laut yang berlaku serta memiliki seluruh persetujuan dan perizinan yang dipersyaratkan sebelum kegiatan operasional dilaksanakan.',
                'evidence'            => 'KKPR/PKKPR atau persetujuan kesesuaian ruang, NIB, izin berusaha, peta lokasi, dokumen perizinan',
                'verification_method' => 'Review dokumen, wawancara, observasi lokasi',
                'regulation'          => 'UU No. 32 Tahun 2014, PP No. 21 Tahun 2021, PP No. 5 Tahun 2021',
            ],
            2 => [
                'name'                => 'Marine Ecosystem Restoration/ Protection',
                'description'         => 'Perusahaan memiliki program perlindungan dan/atau restorasi ekosistem laut yang direncanakan, dilaksanakan, dipantau, dan dievaluasi secara berkala. Program mencakup tujuan, lokasi, jadwal, indikator keberhasilan, serta hasil pelaksanaan yang terdokumentasi.',
                'evidence'            => 'Program kerja, laporan kegiatan, foto sebelum-sesudah, koordinat lokasi, daftar peserta, hasil monitoring',
                'verification_method' => 'Review dokumen, observasi lapangan, wawancara',
                'regulation'          => 'UU No. 32 Tahun 2009, UU No. 32 Tahun 2014, PP No. 22 Tahun 2021',
            ],
            3 => [
                'name'                => 'Prohibition of Destructive Practices',
                'description'         => 'Perusahaan membuktikan bahwa seluruh kegiatan operasional tidak menggunakan praktik yang merusak ekosistem laut atau perairan serta memiliki prosedur pengendalian untuk mencegah kegiatan yang berpotensi menimbulkan kerusakan lingkungan.',
                'evidence'            => 'AMDAL/UKL-UPL, SOP operasional, inspeksi lapangan, laporan pengawasan, berita acara',
                'verification_method' => 'Review dokumen, observasi, wawancara',
                'regulation'          => 'UU No. 32 Tahun 2009, PP No. 22 Tahun 2021',
            ],
            4 => [
                'name'                => 'Water-related Ecosystem Restoration/ Protection',
                'description'         => 'Perusahaan memiliki program perlindungan dan/atau restorasi ekosistem perairan (sungai, danau, waduk, estuari atau kawasan pesisir) yang dilaksanakan secara berkala dan dievaluasi efektivitasnya berdasarkan indikator yang terukur.',
                'evidence'            => 'Program konservasi, laporan kegiatan, foto, hasil monitoring kualitas lingkungan',
                'verification_method' => 'Review dokumen, observasi',
                'regulation'          => 'UU No. 17 Tahun 2019, PP No. 22 Tahun 2021',
            ],
            5 => [
                'name'                => 'Clean Water System',
                'description'         => 'Perusahaan memiliki sistem penyediaan air bersih yang memenuhi kebutuhan operasional, dilakukan pengujian kualitas air secara berkala oleh laboratorium yang kompeten, serta memenuhi baku mutu sesuai peruntukannya.',
                'evidence'            => 'Diagram sistem air bersih, hasil uji laboratorium, SOP, logbook inspeksi',
                'verification_method' => 'Review dokumen, observasi',
                'regulation'          => 'Permenkes No. 2 Tahun 2023, PP No. 22 Tahun 2021',
            ],
            6 => [
                'name'                => 'Wastewater Management',
                'description'         => 'Perusahaan memiliki sistem pengelolaan air limbah yang mencakup pengumpulan, pengolahan, pemantauan kualitas efluen, pemeliharaan instalasi, dan pembuangan sesuai baku mutu yang berlaku.',
                'evidence'            => 'SOP IPAL, layout IPAL, hasil uji efluen, logbook operasi, izin pembuangan',
                'verification_method' => 'Review dokumen, observasi, wawancara',
                'regulation'          => 'PP No. 22 Tahun 2021',
            ],
            7 => [
                'name'                => 'Waste Disposal',
                'description'         => 'Perusahaan menyediakan fasilitas penyimpanan limbah yang sesuai dengan jenis dan kapasitas limbah, dilengkapi identifikasi, pengamanan, serta prosedur pengangkutan dan penyerahan kepada pihak yang berizin apabila dipersyaratkan.',
                'evidence'            => 'Layout TPS Limbah, foto fasilitas, manifest limbah, kontrak pengangkut limbah',
                'verification_method' => 'Review dokumen, observasi',
                'regulation'          => 'PP No. 22 Tahun 2021',
            ],
            8 => [
                'name'                => 'Waste Management Plan',
                'description'         => 'Perusahaan memiliki rencana pengelolaan limbah yang terdokumentasi, mencakup pengurangan, pemilahan, penyimpanan, pemanfaatan kembali, daur ulang, pengangkutan, dan pembuangan akhir sesuai karakteristik limbah. Rencana dievaluasi secara berkala.',
                'evidence'            => 'Waste Management Plan, SOP, laporan realisasi, catatan volume limbah',
                'verification_method' => 'Review dokumen, observasi',
                'regulation'          => 'UU No. 18 Tahun 2008, PP No. 27 Tahun 2020, PP No. 22 Tahun 2021',
            ],
            9 => [
                'name'                => 'Greenhouse Gas Accounting',
                'description'         => 'Perusahaan melakukan inventarisasi emisi gas rumah kaca menggunakan metodologi yang terdokumentasi, menetapkan batas inventarisasi, menghitung emisi secara berkala, serta menyimpan data pendukung perhitungan.',
                'evidence'            => 'Laporan inventarisasi GRK, data konsumsi energi, faktor emisi, spreadsheet perhitungan',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'Perpres No. 98 Tahun 2021, Permen LHK terkait Inventarisasi GRK',
            ],
            10 => [
                'name'                => 'Greenhouse Gas Reduction',
                'description'         => 'Perusahaan memiliki kebijakan, target, dan program pengurangan emisi gas rumah kaca (GRK), melaksanakan upaya mitigasi sesuai kegiatan usahanya, serta melakukan pemantauan dan evaluasi capaian secara berkala.',
                'evidence'            => 'Kebijakan pengurangan emisi, inventarisasi GRK, target dan program penurunan emisi, data konsumsi energi/bahan bakar, laporan pengurangan emisi',
                'verification_method' => 'Review dokumen, wawancara, observasi',
                'regulation'          => 'UU No. 32 Tahun 2009; PP No. 22 Tahun 2021; Perpres No. 98 Tahun 2021; Permen LHK No. 21 Tahun 2022',
            ],
            11 => [
                'name'                => 'Single-Use Plastic Reduction',
                'description'         => 'Perusahaan memiliki kebijakan dan program untuk mengurangi penggunaan plastik sekali pakai pada seluruh kegiatan operasional. Program mencakup target pengurangan, implementasi alternatif ramah lingkungan, pemantauan, dan evaluasi berkala terhadap pencapaian target.',
                'evidence'            => 'Kebijakan pengurangan plastik, program kerja, data penggunaan plastik, laporan realisasi, dokumentasi implementasi',
                'verification_method' => 'Review dokumen, observasi, wawancara',
                'regulation'          => 'UU No. 18 Tahun 2008; PP No. 81 Tahun 2012; Permen LHK No. P75/2019; kebijakan daerah terkait pengurangan plastik sekali pakai',
            ],
            12 => [
                'name'                => 'Water-use Management Plan',
                'description'         => 'Perusahaan memiliki rencana pengelolaan penggunaan air yang terdokumentasi, meliputi identifikasi sumber air, target efisiensi, pengukuran konsumsi, pengendalian kehilangan air, penggunaan kembali (reuse/recycle) apabila memungkinkan, serta evaluasi berkala.',
                'evidence'            => 'Water Management Plan, neraca air, data konsumsi air, laporan evaluasi, SOP',
                'verification_method' => 'Review dokumen, observasi',
                'regulation'          => 'UU No. 17 Tahun 2019 tentang SDA; PP No. 30 Tahun 2024 tentang Pengelolaan SDA; PP No. 22 Tahun 2021',
            ],
            13 => [
                'name'                => 'Energy-use Management',
                'description'         => 'Perusahaan menerapkan sistem manajemen energi yang mencakup identifikasi penggunaan energi, penetapan indikator kinerja energi (EnPI), pemantauan konsumsi energi, pemeliharaan peralatan, serta evaluasi berkala untuk meningkatkan efisiensi energi.',
                'evidence'            => 'Energy Management Plan, data konsumsi energi, KPI energi, SOP, laporan monitoring',
                'verification_method' => 'Review dokumen, observasi, wawancara',
                'regulation'          => 'PP No. 33 Tahun 2023 tentang Konservasi Energi; Permen ESDM tentang Manajemen Energi',
            ],
            14 => [
                'name'                => 'Energy-use Reduction',
                'description'         => 'Perusahaan menetapkan target penurunan konsumsi energi, melaksanakan program efisiensi energi, mengevaluasi capaian secara berkala, dan mendokumentasikan hasil penghematan energi yang dicapai.',
                'evidence'            => 'Target pengurangan energi, laporan efisiensi, data konsumsi sebelum dan sesudah, hasil evaluasi',
                'verification_method' => 'Review dokumen, observasi',
                'regulation'          => 'PP No. 33 Tahun 2023; Perpres No. 22 Tahun 2017 (RUEN)',
            ],
            15 => [
                'name'                => 'Renewable and Clean Energy Utilization',
                'description'         => 'Perusahaan memiliki program pemanfaatan energi baru dan terbarukan atau energi rendah emisi sesuai karakteristik usahanya, termasuk perencanaan, implementasi, pemantauan kinerja, dan evaluasi manfaat lingkungan maupun ekonomi.',
                'evidence'            => 'Dokumen investasi EBT, data produksi/pemakaian energi terbarukan, laporan operasional, foto instalasi',
                'verification_method' => 'Review dokumen, observasi lapangan',
                'regulation'          => 'UU No. 30 Tahun 2007 tentang Energi; Perpres No. 112 Tahun 2022; RUEN',
            ],
            16 => [
                'name'                => 'Access to Residence and Sanitary Amenities at Work',
                'description'         => 'Apabila perusahaan menyediakan fasilitas tempat tinggal, perusahaan memastikan fasilitas tersebut memenuhi persyaratan kesehatan, sanitasi, keselamatan, akses air bersih, ventilasi, dan kelayakan sesuai ketentuan yang berlaku.',
                'evidence'            => 'SOP pengelolaan mess, hasil inspeksi, foto fasilitas, daftar pemeliharaan',
                'verification_method' => 'Review dokumen, observasi',
                'regulation'          => 'UU No. 1 Tahun 1970; PP No. 50 Tahun 2012; Permenkes terkait sanitasi tempat kerja',
            ],
            17 => [
                'name'                => 'Access to Safe Food and Drinking Water at Work',
                'description'         => 'Perusahaan menyediakan makanan (apabila disediakan) dan air minum yang aman, higienis, memenuhi persyaratan kesehatan, tersedia dalam jumlah yang memadai, serta dilakukan pengawasan kualitas secara berkala.',
                'evidence'            => 'Hasil uji kualitas air, kontrak katering (bila ada), SOP higiene, hasil inspeksi',
                'verification_method' => 'Review dokumen, observasi',
                'regulation'          => 'UU No. 17 Tahun 2023 tentang Kesehatan; Permenkes No. 2 Tahun 2023; PP No. 50 Tahun 2012',
            ],
            18 => [
                'name'                => 'Access to Medical Care and Insurance at Work',
                'description'         => 'Seluruh pekerja memperoleh akses terhadap pelayanan kesehatan kerja dan kepesertaan program jaminan sosial sesuai ketentuan peraturan perundang-undangan. Perusahaan memiliki prosedur penanganan keadaan darurat medis dan pencatatan pelayanan kesehatan kerja.',
                'evidence'            => 'Bukti kepesertaan BPJS Kesehatan dan BPJS Ketenagakerjaan, SOP P3K, daftar petugas P3K, rekam medis kerja, laporan kecelakaan',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 24 Tahun 2011; PP No. 44 Tahun 2015; PP No. 82 Tahun 2019; UU No. 1 Tahun 1970',
            ],
            19 => [
                'name'                => 'Safety Working Conditions',
                'description'         => 'Perusahaan menerapkan Sistem Manajemen Keselamatan dan Kesehatan Kerja (SMK3) atau sistem sejenis yang mencakup identifikasi bahaya, penilaian risiko, pengendalian risiko, penyediaan APD, pelatihan K3, pelaporan insiden, investigasi kecelakaan, audit internal, dan tindakan perbaikan berkelanjutan.',
                'evidence'            => 'Manual SMK3, HIRADC/JSA, SOP K3, daftar APD, laporan inspeksi, laporan kecelakaan, pelatihan K3',
                'verification_method' => 'Review dokumen, observasi lapangan, wawancara',
                'regulation'          => 'UU No. 1 Tahun 1970; PP No. 50 Tahun 2012; Permenaker No. 5 Tahun 2018',
            ],
            20 => [
                'name'                => 'Healthy Working Conditions',
                'description'         => 'Perusahaan menyediakan lingkungan kerja yang bersih, sehat, aman, dan nyaman melalui pengendalian faktor bahaya fisik, kimia, biologi, ergonomi, dan psikososial. Perusahaan melakukan pemantauan kondisi lingkungan kerja dan kesehatan pekerja secara berkala serta menindaklanjuti hasil pemantauan sebagai bagian dari perbaikan berkelanjutan.',
                'evidence'            => 'Hasil pengukuran lingkungan kerja, laporan pemeriksaan kesehatan berkala, SOP higiene industri, laporan inspeksi, dokumentasi fasilitas kerja',
                'verification_method' => 'Review dokumen, observasi lapangan, wawancara',
                'regulation'          => 'UU No. 1 Tahun 1970; UU No. 17 Tahun 2023 tentang Kesehatan; PP No. 50 Tahun 2012; Permenaker No. 5 Tahun 2018',
            ],
            21 => [
                'name'                => 'Access to Education',
                'description'         => 'Perusahaan menyediakan akses pendidikan, pelatihan, atau pengembangan kompetensi bagi pekerja secara adil sesuai kebutuhan jabatan serta mendokumentasikan pelaksanaan dan evaluasi efektivitasnya.',
                'evidence'            => 'Program pelatihan, matriks kompetensi, sertifikat, daftar hadir, evaluasi pelatihan',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; PP No. 31 Tahun 2006',
            ],
            22 => [
                'name'                => 'Community Consultation',
                'description'         => 'Perusahaan memiliki mekanisme konsultasi, komunikasi, dan pelibatan masyarakat serta pemangku kepentingan yang terdampak kegiatan usaha. Masukan masyarakat didokumentasikan, dianalisis, dan menjadi pertimbangan dalam pengambilan keputusan serta ditindaklanjuti secara transparan.',
                'evidence'            => 'Stakeholder Engagement Plan, notulen konsultasi publik, daftar hadir, berita acara, daftar keluhan dan tindak lanjut',
                'verification_method' => 'Review dokumen, wawancara, observasi',
                'regulation'          => 'UU No. 32 Tahun 2009; PP No. 22 Tahun 2021',
            ],
            23 => [
                'name'                => 'Local Hiring',
                'description'         => 'Perusahaan menerapkan kebijakan rekrutmen yang memberikan kesempatan kerja kepada masyarakat lokal sesuai kebutuhan kompetensi, tanpa mengurangi prinsip merit dan non-diskriminasi. Perusahaan memantau kontribusi tenaga kerja lokal secara berkala.',
                'evidence'            => 'SOP rekrutmen, data tenaga kerja lokal, laporan ketenagakerjaan, program peningkatan kompetensi',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; PP No. 35 Tahun 2021',
            ],
            24 => [
                'name'                => 'Local Culture and Product Promotion',
                'description'         => 'Perusahaan mendukung pelestarian budaya lokal serta mempromosikan penggunaan produk lokal melalui program pemberdayaan masyarakat, kemitraan dengan UMKM, atau pengadaan barang dan jasa yang mempertimbangkan potensi lokal sesuai ketentuan yang berlaku.',
                'evidence'            => 'Program CSR, MOU dengan UMKM, laporan kegiatan, dokumentasi promosi budaya, kontrak pengadaan lokal',
                'verification_method' => 'Review dokumen, observasi',
                'regulation'          => 'UU No. 5 Tahun 2017; UU No. 20 Tahun 2008',
            ],
            25 => [
                'name'                => 'Access to Natural Resources',
                'description'         => 'Perusahaan memastikan kegiatan usahanya tidak membatasi akses masyarakat terhadap sumber daya alam yang sah serta menerapkan mekanisme penyelesaian konflik apabila terjadi sengketa pemanfaatan sumber daya. Pengelolaan dilakukan dengan memperhatikan prinsip keberlanjutan dan daya dukung lingkungan.',
                'evidence'            => 'Dokumen AMDAL/UKL-UPL, peta wilayah, mekanisme pengaduan, berita acara konsultasi masyarakat, laporan pengelolaan lingkungan',
                'verification_method' => 'Review dokumen, observasi, wawancara',
                'regulation'          => 'UU No. 32 Tahun 2009; UU No. 32 Tahun 2014; PP No. 22 Tahun 2021',
            ],
            26 => [
                'name'                => 'Freedom of Association',
                'description'         => 'Perusahaan menghormati hak pekerja untuk membentuk, bergabung, atau tidak bergabung dalam serikat pekerja serta menjamin tidak adanya intimidasi, diskriminasi, atau tindakan yang menghambat kebebasan berserikat sesuai ketentuan peraturan perundang-undangan.',
                'evidence'            => 'Peraturan Perusahaan/PKB, bukti keberadaan serikat pekerja, notulen pertemuan bipartit, mekanisme penyelesaian perselisihan',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 21 Tahun 2000; UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023',
            ],
            27 => [
                'name'                => 'Non-Discrimination',
                'description'         => 'Perusahaan menerapkan kebijakan anti-diskriminasi dalam seluruh proses ketenagakerjaan, termasuk rekrutmen, pengupahan, promosi, pelatihan, penilaian kinerja, dan pemutusan hubungan kerja, tanpa membedakan suku, agama, ras, jenis kelamin, usia, disabilitas, atau latar belakang lainnya.',
                'evidence'            => 'Kebijakan anti-diskriminasi, SOP SDM, data promosi, mekanisme pengaduan, laporan penyelesaian kasus',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 39 Tahun 1999; UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023',
            ],
            28 => [
                'name'                => 'Collective Bargaining',
                'description'         => 'Perusahaan memfasilitasi perundingan bersama dengan pekerja atau serikat pekerja dalam penyusunan Perjanjian Kerja Bersama (PKB) atau bentuk kesepakatan lainnya. Proses dilakukan secara transparan, terdokumentasi, dan sesuai ketentuan hukum yang berlaku.',
                'evidence'            => 'PKB, berita acara perundingan, daftar hadir, notulen rapat, dokumen hasil kesepakatan',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; Permenaker tentang PKB',
            ],
            29 => [
                'name'                => 'Womens Labor Rights',
                'description'         => 'Perusahaan menjamin pemenuhan hak pekerja perempuan sesuai peraturan perundang-undangan, termasuk perlindungan terhadap diskriminasi, kesempatan yang setara, cuti melahirkan, cuti keguguran, perlindungan bagi pekerja hamil, perlindungan dari pelecehan dan kekerasan di tempat kerja, serta fasilitas yang diwajibkan oleh peraturan.',
                'evidence'            => 'Kebijakan perlindungan pekerja perempuan, SOP, data cuti, fasilitas laktasi (apabila diwajibkan), mekanisme pengaduan, dokumentasi sosialisasi',
                'verification_method' => 'Review dokumen, observasi, wawancara',
                'regulation'          => 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; UU No. 12 Tahun 2022 tentang TPKS; Permenaker terkait pekerja perempuan',
            ],
            30 => [
                'name'                => 'Youth Employment',
                'description'         => 'Perusahaan mematuhi ketentuan mengenai usia minimum bekerja, tidak mempekerjakan anak di bawah batas usia yang ditetapkan, serta menyediakan program pembinaan, pelatihan, dan pengembangan kompetensi bagi pekerja muda (16-30 tahun) sesuai dengan ketentuan peraturan perundang-undangan.',
                'evidence'            => 'Data identitas pekerja, SOP rekrutmen, program pelatihan, laporan pengembangan kompetensi, hasil verifikasi usia',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; Konvensi ILO No. 138 dan No. 182 (diratifikasi Indonesia)',
            ],
            31 => [
                'name'                => 'Employment of Persons with Disabilities',
                'description'         => 'Perusahaan memberikan kesempatan kerja yang setara kepada penyandang disabilitas sesuai kompetensi dan kebutuhan jabatan, serta menyediakan akomodasi yang layak (reasonable accommodation) apabila diperlukan. Rekrutmen, pengembangan karier, dan lingkungan kerja dilaksanakan tanpa diskriminasi.',
                'evidence'            => 'Kebijakan ketenagakerjaan, data pekerja penyandang disabilitas, SOP rekrutmen, dokumentasi fasilitas aksesibilitas, program pelatihan',
                'verification_method' => 'Review dokumen, observasi, wawancara',
                'regulation'          => 'UU No. 8 Tahun 2016 tentang Penyandang Disabilitas; PP No. 60 Tahun 2020',
            ],
            32 => [
                'name'                => 'No Forced Labor',
                'description'         => 'Perusahaan menjamin bahwa seluruh hubungan kerja dilakukan secara sukarela tanpa adanya kerja paksa, ancaman, intimidasi, penyitaan dokumen pribadi, atau bentuk pemaksaan lainnya. Lembur hanya dilakukan berdasarkan persetujuan pekerja dan diberikan kompensasi sesuai ketentuan yang berlaku.',
                'evidence'            => 'Perjanjian kerja, kebijakan ketenagakerjaan, data lembur, slip pembayaran lembur, mekanisme pengaduan',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; Konvensi ILO No. 129 dan No. 105',
            ],
            33 => [
                'name'                => 'Minimum Age and No Child Labor',
                'description'         => 'Perusahaan tidak mempekerjakan pekerja di bawah usia minimum yang ditetapkan dalam peraturan perundang-undangan serta menerapkan prosedur verifikasi usia pada proses rekrutmen. Perusahaan juga melakukan pengawasan untuk mencegah pekerja anak dalam kegiatan operasional yang berada di bawah kendalinya.',
                'evidence'            => 'Dokumen identitas pekerja, SOP rekrutmen, hasil verifikasi usia, daftar karyawan',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; Konvensi ILO No. 138 dan No. 182',
            ],
            34 => [
                'name'                => 'Equal Remuneration',
                'description'         => 'Perusahaan menerapkan sistem remunerasi yang adil berdasarkan jabatan, kompetensi, tanggung jawab, dan kinerja tanpa diskriminasi. Upah, lembur, insentif, dan tunjangan diberikan sesuai ketentuan peraturan perundang-undangan dan terdokumentasi dengan baik.',
                'evidence'            => 'Struktur dan skala upah, slip gaji, kebijakan remunerasi, bukti pembayaran lembur, hasil evaluasi jabatan',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'PP No. 36 Tahun 2021 tentang Pengupahan; UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023',
            ],
            35 => [
                'name'                => 'Seasonal and Part-time Workers Employment',
                'description'         => 'Perusahaan memperlakukan pekerja musiman, pekerja paruh waktu, pekerja kontrak, maupun peserta magang sesuai dengan ketentuan peraturan perundang-undangan, termasuk hak atas upah, keselamatan kerja, pelatihan, dan perlindungan sosial apabila dipersyaratkan. Program magang atau rekrutmen pekerja musiman dilakukan secara transparan dan terdokumentasi.',
                'evidence'            => 'Perjanjian kerja PKWT/part-time, data pekerja musiman, program magang, bukti pembayaran upah, laporan pelatihan',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; PP No. 35 Tahun 2021',
            ],
            36 => [
                'name'                => 'Fair Contract for Employees',
                'description'         => 'Seluruh pekerja memiliki perjanjian kerja tertulis yang memuat hak dan kewajiban para pihak secara jelas, sesuai dengan ketentuan peraturan perundang-undangan, ditandatangani sebelum hubungan kerja dimulai, serta mudah dipahami oleh pekerja.',
                'evidence'            => 'PKWT/PKWTT, Peraturan Perusahaan atau PKB, SOP SDM, bukti penandatanganan kontrak',
                'verification_method' => 'Review dokumen',
                'regulation'          => 'UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; PP No. 35 Tahun 2021',
            ],
            37 => [
                'name'                => 'On Time Payment of Wages',
                'description'         => 'Perusahaan membayarkan upah, tunjangan, dan hak finansial lainnya secara tepat waktu sesuai perjanjian kerja dan ketentuan peraturan perundang-undangan. Perusahaan memiliki sistem penggajian yang terdokumentasi serta mekanisme penanganan apabila terjadi keterlambatan pembayaran.',
                'evidence'            => 'Slip gaji, bukti transfer bank, daftar pengupahan, laporan pembayaran gaji, SOP payroll',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'PP No. 36 Tahun 2021 tentang Pengupahan; UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023',
            ],
            38 => [
                'name'                => 'Legal Working Hours',
                'description'         => 'Perusahaan menerapkan jam kerja, waktu istirahat, hari kerja, hari libur, dan kerja lembur sesuai dengan ketentuan peraturan perundang-undangan yang berlaku. Perusahaan memiliki sistem pencatatan jam kerja yang akurat, memastikan lembur dilakukan berdasarkan persetujuan pekerja apabila dipersyaratkan, memberikan kompensasi lembur sesuai ketentuan, serta melakukan evaluasi secara berkala terhadap kepatuhan jam kerja.',
                'evidence'            => 'Peraturan Perusahaan/PKB, jadwal kerja, daftar hadir (manual/digital), timesheet, rekap lembur, formulir persetujuan lembur, slip pembayaran lembur, laporan audit internal',
                'verification_method' => 'Review dokumen, wawancara pekerja, observasi sistem absensi',
                'regulation'          => 'UU No. 13 Tahun 2003 tentang Ketenagakerjaan sebagaimana diubah dengan UU No. 6 Tahun 2023; PP No. 35 Tahun 2021; Kepmenaker No. 102/MEN/VI/2004 (sepanjang masih relevan)',
            ],
            39 => [
                'name'                => 'Paid Pregnancy, Parental and Sick Leave',
                'description'         => 'Perusahaan memberikan hak cuti melahirkan, cuti keguguran, cuti ayah (apabila diatur dalam peraturan perusahaan/PKB), cuti sakit, serta hak cuti lainnya sesuai ketentuan peraturan perundang-undangan. Prosedur pengajuan cuti terdokumentasi, tidak mengurangi hak normatif pekerja, dan tidak menjadi dasar diskriminasi dalam penilaian kinerja, promosi, maupun hubungan kerja.',
                'evidence'            => 'Peraturan Perusahaan/PKB, SOP cuti, data pengajuan dan persetujuan cuti, daftar cuti pekerja, rekam medis (apabila dipersyaratkan), slip pembayaran selama masa cuti',
                'verification_method' => 'Review dokumen, wawancara pekerja dan HR, verifikasi sampel data cuti',
                'regulation'          => 'UU No. 13 Tahun 2003 sebagaimana diubah dengan UU No. 6 Tahun 2023; UU No. 17 Tahun 2023 tentang Kesehatan; PP No. 35 Tahun 2021',
            ],
            40 => [
                'name'                => 'Retirement Benefits',
                'description'         => 'Perusahaan memiliki kebijakan mengenai manfaat pensiun atau manfaat setelah berakhirnya hubungan kerja sesuai dengan ketentuan peraturan perundang-undangan, termasuk kepesertaan pekerja dalam program jaminan pensiun dan jaminan hari tua yang diwajibkan. Perusahaan memastikan seluruh hak pekerja yang memasuki masa pensiun dipenuhi secara tepat waktu, terdokumentasi, dan dikomunikasikan secara transparan kepada pekerja.',
                'evidence'            => 'Kebijakan pensiun, bukti kepesertaan BPJS Ketenagakerjaan (JHT dan JP), daftar pekerja pensiun, bukti pembayaran manfaat pensiun/pesangon, SOP pensiun',
                'verification_method' => 'Review dokumen, wawancara HR, verifikasi sampel dokumen pensiun',
                'regulation'          => 'UU No. 13 Tahun 2003 sebagaimana diubah dengan UU No. 6 Tahun 2023; UU No. 24 Tahun 2011 tentang BPJS; PP No. 45 Tahun 2015 tentang Penyelenggaraan Program Jaminan Pensiun; PP No. 46 Tahun 2015 tentang Jaminan Hari Tua',
            ],
            41 => [
                'name'                => 'Minimum Wage',
                'description'         => 'Perusahaan membayarkan upah kepada seluruh pekerja sekurang-kurangnya sebesar Upah Minimum yang berlaku sesuai lokasi usaha dan ketentuan peraturan perundang-undangan. Perusahaan memiliki struktur dan skala upah yang terdokumentasi serta melakukan evaluasi apabila terjadi perubahan ketentuan Upah Minimum.',
                'evidence'            => 'Struktur dan skala upah, slip gaji, bukti transfer, daftar pengupahan, Peraturan Perusahaan/PKB',
                'verification_method' => 'Review dokumen, wawancara pekerja',
                'regulation'          => 'UU No. 13 Tahun 2003 sebagaimana diubah dengan UU No. 6 Tahun 2023; PP No. 36 Tahun 2021 tentang Pengupahan',
            ],
            42 => [
                'name'                => 'Living Wage',
                'description'         => 'Perusahaan berupaya meningkatkan kesejahteraan pekerja melalui kebijakan remunerasi dan fasilitas kesejahteraan yang mempertimbangkan kebutuhan hidup layak, produktivitas, kemampuan perusahaan, dan keberlanjutan usaha. Apabila perusahaan menetapkan standar internal mengenai living wage, pelaksanaannya didokumentasikan dan dievaluasi secara berkala.',
                'evidence'            => 'Kebijakan remunerasi, struktur kompensasi, fasilitas kesejahteraan, hasil survei kesejahteraan, laporan evaluasi',
                'verification_method' => 'Review dokumen, wawancara manajemen dan pekerja',
                'regulation'          => 'PP No. 36 Tahun 2021; UU No. 13 Tahun 2003 jo. UU No. 6 Tahun 2023; praktik baik ILO mengenai Living Wage',
            ],
            43 => [
                'name'                => 'Premiums',
                'description'         => 'Perusahaan menyediakan perlindungan asuransi bagi pekerja melalui pembayaran premi asuransi kesehatan, ketenagakerjaan, jiwa, atau jenis asuransi lainnya yang relevan guna meningkatkan kesejahteraan, keamanan finansial, dan perlindungan sosial tenaga kerja.',
                'evidence'            => 'Polis asuransi, bukti pembayaran premi, bukti kepesertaan BPJS atau asuransi, daftar peserta yang diasuransikan, kebijakan perusahaan terkait asuransi',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 40 Tahun 2004, UU No. 24 Tahun 2011, PP No. 44 Tahun 2015 jo. PP No. 49 Tahun 2023, PP No. 45 Tahun 2015, PP No. 46 Tahun 2015 jo. PP No. 60 Tahun 2015, PP No. 37 Tahun 2021 jo. PP No. 6 Tahun 2025',
            ],
            44 => [
                'name'                => 'Tax Compliance',
                'description'         => 'Perusahaan memenuhi seluruh kewajiban perpajakan sesuai ketentuan peraturan perundang-undangan, termasuk pendaftaran NPWP, pelaporan Surat Pemberitahuan (SPT), pembayaran pajak, pemotongan/pemungutan pajak apabila diwajibkan, serta menyimpan dokumen perpajakan secara tertib dan dapat ditelusuri.',
                'evidence'            => 'NPWP, Bukti Penerimaan Elektronik (BPE), SPT Tahunan/Masa, bukti pembayaran pajak, laporan audit',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'UU No. 6 Tahun 1983 sebagaimana terakhir diubah dengan UU Harmonisasi Peraturan Perpajakan (UU No. 7 Tahun 2021)',
            ],
            45 => [
                'name'                => 'Retribution Payment',
                'description'         => 'Perusahaan memenuhi kewajiban pembayaran retribusi daerah, Penerimaan Negara Bukan Pajak (PNBP), atau pungutan resmi lainnya yang berkaitan dengan kegiatan usahanya sesuai dengan ketentuan peraturan perundang-undangan. Seluruh pembayaran terdokumentasi dan dapat ditelusuri.',
                'evidence'            => 'Bukti pembayaran retribusi, bukti pembayaran PNBP, izin usaha, laporan keuangan, kuitansi resmi',
                'verification_method' => 'Review dokumen',
                'regulation'          => 'UU No. 1 Tahun 2022 tentang Hubungan Keuangan antara Pemerintah Pusat dan Pemerintahan Daerah; peraturan daerah yang relevan',
            ],
            46 => [
                'name'                => 'Agreement With Trader/ Costumers',
                'description'         => 'Perusahaan memiliki perjanjian tertulis dengan pedagang, pembeli, pelanggan, atau mitra usaha yang memuat hak dan kewajiban para pihak, spesifikasi produk atau jasa, mekanisme pembayaran, penyelesaian sengketa, dan ketentuan lain yang relevan. Perjanjian ditinjau secara berkala dan dipatuhi oleh para pihak.',
                'evidence'            => 'Kontrak/MoU, Purchase Order, Sales Agreement, SOP pengelolaan kontrak, dokumentasi evaluasi kontrak',
                'verification_method' => 'Review dokumen, wawancara',
                'regulation'          => 'KUH Perdata, UU No. 8 Tahun 1999 tentang Perlindungan Konsumen; UU No. 7 Tahun 2014 tentang Perdagangan',
            ],
            47 => [
                'name'                => 'Product Recycling and Reuse',
                'description'         => 'Perusahaan menerapkan program penggunaan kembali (reuse), daur ulang (recycling), atau pemanfaatan kembali produk, kemasan, bahan baku, maupun limbah yang masih memiliki nilai guna. Program memiliki target, indikator kinerja, pelaksanaan, pemantauan, dan evaluasi berkala untuk mendukung ekonomi sirkular.',
                'evidence'            => 'Circular Economy Plan, data volume reuse/recycling, SOP, laporan capaian, dokumentasi implementasi',
                'verification_method' => 'Review dokumen, observasi lapangan',
                'regulation'          => 'UU No. 18 Tahun 2008 tentang Pengelolaan Sampah; PP No. 27 Tahun 2020; PP No. 22 Tahun 2021',
            ],
            48 => [
                'name'                => 'Innovation and Technological Intervention',
                'description'         => 'Perusahaan mengembangkan dan/atau menerapkan inovasi teknologi untuk meningkatkan efisiensi operasional, produktivitas, keselamatan kerja, perlindungan lingkungan, atau keberlanjutan usaha. Inovasi direncanakan, diuji, didokumentasikan, dievaluasi efektivitasnya, dan ditingkatkan secara berkelanjutan.',
                'evidence'            => 'Roadmap inovasi, laporan R&D, paten/HKI (apabila ada), SOP teknologi, laporan implementasi, indikator kinerja',
                'verification_method' => 'Review dokumen, observasi, wawancara',
                'regulation'          => 'UU No. 11 Tahun 2019 tentang Sistem Nasional Ilmu Pengetahuan dan Teknologi',
            ],
            49 => [
                'name'                => 'Local Micro-, Small-, and Medium Sized Enterprises Development',
                'description'         => 'Perusahaan melaksanakan program pengembangan UMKM lokal melalui kemitraan, pelatihan, pendampingan, akses pasar, penguatan kapasitas usaha, atau dukungan pembiayaan sesuai dengan karakteristik kegiatan usahanya. Program dievaluasi secara berkala berdasarkan indikator yang terukur.',
                'evidence'            => 'Program kemitraan UMKM, daftar UMKM binaan, laporan pelatihan, MoU, laporan evaluasi, dokumentasi kegiatan',
                'verification_method' => 'Review dokumen, wawancara, observasi',
                'regulation'          => 'UU No. 20 Tahun 2008 tentang UMKM; PP No. 7 Tahun 2021',
            ],
            50 => [
                'name'                => 'Digital Transformation',
                'description'         => 'Perusahaan memiliki strategi transformasi digital untuk meningkatkan efektivitas tata kelola, operasional, pelayanan, pengelolaan data, dan pengambilan keputusan. Implementasi mencakup pemanfaatan teknologi informasi yang sesuai dengan kebutuhan organisasi, pengamanan data, peningkatan kompetensi SDM, serta evaluasi berkala terhadap efektivitas sistem digital yang digunakan.',
                'evidence'            => 'Roadmap transformasi digital, kebijakan TI, SOP keamanan informasi, laporan implementasi sistem, pelatihan pengguna, hasil evaluasi',
                'verification_method' => 'Review dokumen, observasi, wawancara',
                'regulation'          => 'UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi; UU No. 11 Tahun 2008 jo. UU No. 1 Tahun 2024 tentang Informasi dan Transaksi Elektronik; PP No. 71 Tahun 2019',
            ],
        ];

        foreach ($data as $id => $row) {
            // Assign 5 indicators per principle (10 principles total)
            $principleId = (int) ceil($id / 5);

            $indicator = \App\Models\Indicator::updateOrCreate(
                ['id' => $id],
                [
                    'principle_id'        => $principleId,
                    'name'                => $row['name'],
                    'description'         => $row['description'],
                    'evidence'            => $row['evidence'],
                    'verification_method' => $row['verification_method'],
                    'regulation'          => $row['regulation'],
                    'sort_order'          => $id,
                ]
            );

            \App\Models\Question::updateOrCreate(
                ['indicator_id' => $indicator->id],
                [
                    'text'       => 'Apakah perusahaan memenuhi kriteria ' . $row['name'] . '? (' . \Illuminate\Support\Str::limit($row['description'], 150) . ')',
                    'sort_order' => $id,
                ]
            );

        }

        $this->command->info('IndicatorAuditDataSeeder: Successfully seeded ' . count($data) . ' indicators & questions with full audit metadata.');
    }
}

