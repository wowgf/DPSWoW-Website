interface Specialization {
  playableid: number;
  specializationname: string;
  specializationid: number;
  hrnodeid: number;
  namecolor: string;
  namespec: string;
  gendermaledescription: string;
  genderfemaledescription: string;
  mediaid: number;
  role: string;
  rolename: string;
  powertypename: string;
  primarystattype: string;
  weaponItemSubClassList?: number[];
}

interface Metier {
  name: string;
  namenick: string;
  namecolor: string;
  playableid: number;
  bgcolor: string;
  mediaid: number;
  gendermalename: string;
  genderfemalename: string;
  powertypename: string;
  armors?: number[];
  specializationList: Specialization[];
}