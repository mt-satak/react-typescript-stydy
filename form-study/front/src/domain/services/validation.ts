import { Profile } from "../entity/profile";
import { Validation } from "../entity/validation";
import { PROFILE } from "./profile";
import { College } from "../entity/college";
import { Career } from "../entity/career";
import { exitEmptyCareers } from "./career";

export const calculateValidation = (profile: Profile) => {
  const message: Validation = {
    name: emptyValidation(profile.name, PROFILE.NAME),
    description: lengthValidation(profile.description, 1000),
    birthday: emptyValidation(profile.birthday, PROFILE.BIRTHDAY),
    gender: emptyValidation(profile.gender, PROFILE.GENDER),
    address: {
      postalcode: emptyValidation(
        profile.address.postalcode,
        PROFILE.ADDRESS.POSTALCODE
      ),
      prefecture: emptyValidation(
        profile.address.prefecture,
        PROFILE.ADDRESS.PREFECTURE
      ),
      city: emptyValidation(profile.address.city, PROFILE.ADDRESS.CITY),
      restAddress: emptyValidation(
        profile.address.restAddress,
        PROFILE.ADDRESS.RESTADDRES
      )
    },
    // collegeおよびcareersに関しては次のパート以降で実装
    college: {
      faculty: facultyValidation(profile.college)
    },
    careers: careerValidation(profile.careers)
  };

  return message;
};

export const isValid = (message: Validation) => {
  const falttenValues = Object.values(message)
    .map(extractValues)
    .flat() as string[];

  return falttenValues.every(fv => !fv);
};

// 再帰的にObjectを配列に
const extractValues = (obj: any): any[] | string => {
  if (typeof obj === "string") return obj;
  return Object.values(obj).map(extractValues);
};

// 必須チェック
const emptyValidation = (target: string, col: string) =>
  isEmpty(target) ? `${col}を入力してください。` : "";
const isEmpty = (str: string) => !str.trim();

// 文字数チェック
const lengthValidation = (target: string, maxLen: number) =>
  isTooLong(target, maxLen) ? `${maxLen}文字以内で入力してください。` : "";
const isTooLong = (str: string, maxLen: number) => str.trim().length > maxLen;

// 職歴のみ複数件存在する可能性があるため、個別に必須チェックを行う
const careerValidation = (careers: Career[]) => 
  careers.map(c => ({
    company: emptyValidation(c.company, PROFILE.CAREERS.COMPANY),
    position: emptyValidation(c.position, PROFILE.CAREERS.POSITION),
    startAt: emptyValidation(c.startAt, PROFILE.CAREERS.START_AT),
    endAt: emptyValidation(c.endAt, PROFILE.CAREERS.END_AT)
  }));

// 学部は学校名が入力されている時のみ必須チェックを行う
const facultyValidation = (college: College) =>
  college.name && !college.faculty ? `${PROFILE.COLLEGE.FACULTY}を入力してください。` : "";