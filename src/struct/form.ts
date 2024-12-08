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
  salaryType: string,
  salary: string,
  currency: string,
  location: string,
  userName: string;
  phone: string;
  email: string;
  experience: string;
  selectedSkills: string[];
  selectedLanguages: selectedLanguage[];
}

export interface missionFormUpdate {
  name: string,
  start_date: string,
  end_date: string,
  salary_type: string,
  salary: string,
  currency: string,
  location: string,
  detail: string;
  user: number;
  skills: string[];
  languages: selectedLanguage[];
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