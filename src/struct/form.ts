export interface selectedLanguage {
  lan: string;
  level: string;
}

export interface searchItem {
  value: string
  link: string
}

export interface loginForm{
  userName: string,
  password: string
}

export interface registerForm{
  userName: '',
  phone: '',
  email: '',
  birthday: '',
  password: ''
}

export interface missionForm {
  missionName: string,
  startday: string,
  endday: string,
  type: string,
  currency: string,
  money: string,
  location: string,
  userName: string;
  phone: string;
  email: string;
  experience: string;
  selectedSkills: [];
  selectedLanguages: selectedLanguage[];
}

export interface userForm {
  userName: string;
  phone: string;
  email: string;
  birthday: string;
  experience: string;
  selectedSkills: [];
  selectedLanguages: selectedLanguage[];
}

export interface accountForm {
  userName: string;
  phone: string;
  email: string;
  password: string,
  checkPassword: string,
  birthday: string;
  experience: string;
  selectedSkills: [];
  selectedLanguages: selectedLanguage[];
}