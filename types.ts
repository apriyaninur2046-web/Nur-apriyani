export enum Major {
  TI = 'Teknik Informatika',
  SI = 'Sistem Informasi',
  DKV = 'Desain Komunikasi Visual',
  MJ = 'Manajemen',
  AK = 'Akuntansi'
}

export enum Status {
  ACTIVE = 'Aktif',
  GRADUATED = 'Lulus',
  LEAVE = 'Cuti',
  DROPOUT = 'Drop Out'
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  url: string; // Mock URL
}

export interface Student {
  id: string;
  nim: string;
  name: string;
  major: Major;
  entryYear: number;
  email: string;
  phone: string;
  address: string;
  status: Status;
  documents: Document[];
}

export const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    nim: '2023001',
    name: 'Budi Santoso',
    major: Major.TI,
    entryYear: 2023,
    email: 'budi.s@univ.ac.id',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 10, Jakarta',
    status: Status.ACTIVE,
    documents: [
      { id: 'd1', name: 'KTP_Scan.jpg', type: 'image/jpeg', uploadDate: '2023-08-01', url: '#' },
      { id: 'd2', name: 'Ijazah_SMA.pdf', type: 'application/pdf', uploadDate: '2023-08-01', url: '#' }
    ]
  },
  {
    id: '2',
    nim: '2022045',
    name: 'Siti Aminah',
    major: Major.SI,
    entryYear: 2022,
    email: 'siti.a@univ.ac.id',
    phone: '081987654321',
    address: 'Jl. Kebon Jeruk No. 5, Bandung',
    status: Status.ACTIVE,
    documents: []
  },
  {
    id: '3',
    nim: '2021088',
    name: 'Rizky Pratama',
    major: Major.DKV,
    entryYear: 2021,
    email: 'rizky.p@univ.ac.id',
    phone: '085678912345',
    address: 'Jl. Diponegoro No. 12, Surabaya',
    status: Status.LEAVE,
    documents: []
  },
  {
    id: '4',
    nim: '2020012',
    name: 'Dewi Lestari',
    major: Major.MJ,
    entryYear: 2020,
    email: 'dewi.l@univ.ac.id',
    phone: '081345678912',
    address: 'Jl. Sudirman No. 88, Yogyakarta',
    status: Status.GRADUATED,
    documents: []
  },
  {
    id: '5',
    nim: '2023055',
    name: 'Andi Wijaya',
    major: Major.TI,
    entryYear: 2023,
    email: 'andi.w@univ.ac.id',
    phone: '081298765432',
    address: 'Jl. Ahmad Yani No. 3, Semarang',
    status: Status.ACTIVE,
    documents: []
  }
];

export type ViewState = 'dashboard' | 'students' | 'archive' | 'settings';