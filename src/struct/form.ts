export interface selectedLanguage {
  lan: string;
  level: string;
}

export interface searchItem {
  value: string
  link: string
}

export interface loginForm{
  email: string,
  password: string
}

export interface registerForm{
  username: string,
  phone_number: string,
  email: string,
  birth_date: string,
  password: string,
  is_active: boolean,
  is_superuser: boolean
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
  selectedSkills: string[];
  selectedLanguages: selectedLanguage[];
}

export interface userForm {
  userName: string;
  phone: string;
  email: string;
  birthday: string;
  experience: string;
  selectedSkills: string[];
  selectedLanguages: selectedLanguage[];
}
export interface userFormUpdate {
  username: string,
  phone_number: string,
  email: string,
  is_active: boolean,
  birth_date: string
}