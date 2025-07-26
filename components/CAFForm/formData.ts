export type ChildDetail = {
  name: string;
  dob: string;
};

export type PersonalDetails = {
  title: string;
  firstName: string;
  lastName: string;
  userName: string;
  dob: string | null;
  countryOfBirth: string;
  maritalStatus: string;
  socialSecurityNumber: string;
  dateOfArrival: string | null;
};

export type PartnerSpouse = {
  title: string;
  firstName: string;
  lastName: string;
  userName: string;
  dob: string | null;
  countryOfBirth: string;
  maritalStatus: string;
  socialSecurityNumber: string;
  dateOfArrival: string | null;
};

export type MsaRegistration = {
  isPreviouslyRegistered: boolean | null;
  organizationName: string;
  organizationCountry: string;
  beneficiaryNumber: string;
};
export type ParentsInformation = {
  isReceivingAid: boolean | null;
  fullName: string;
  fullAddress: string;
  cafNumber: string;
  socialSecurityNumber: string;
};

export type ContactInformation = {
  fullAddress: string;
  city: string;
  postCode: string;
  phone: string;
  email: string;
  addressSince: string;
  isCouple: boolean | null;
  numberOfChildren: string;
  householdSize: string;
  partnerAbroadCountry: string;
  partnerAbroadSince: string;
};

export type EmploymentSituation = {
  currentStatus: string;
  contractType: string;
  startDate: string;
  endDate: string;
  socialContribution: string;
  foreignContributionCountry: string;
};

export type Declaration = {
  placeOfSignature: string;
  dateOfSignature: string;
  signature: string;
  declarationAccepted: boolean;
};

export type FormData = {
  personalDetails: PersonalDetails;
  partnerSpouse: PartnerSpouse;
  msaRegistration: MsaRegistration;
  contactInformation: ContactInformation;
  parentsInformation: ParentsInformation;
  employmentSituation: EmploymentSituation;
  declaration: Declaration;
};

export const getInitialFormData = (): FormData => ({
  personalDetails: {
    title: "",
    firstName: "",
    lastName: "",
    userName: "",
    dob: null,
    countryOfBirth: "",
    maritalStatus: "",
    socialSecurityNumber: "",
    dateOfArrival: null,
  },

  partnerSpouse: {
    title: "",
    firstName: "",
    lastName: "",
    userName: "",
    dob: null,
    countryOfBirth: "",
    maritalStatus: "",
    socialSecurityNumber: "",
    dateOfArrival: null,
  },

  msaRegistration: {
    isPreviouslyRegistered: null,
    organizationName: "",
    organizationCountry: "",
    beneficiaryNumber: "",
  },

  contactInformation: {
    fullAddress: "",
    city: "",
    postCode: "",
    phone: "",
    email: "",
    addressSince: "",
    isCouple: null,
    numberOfChildren: "",
    householdSize: "",
    partnerAbroadCountry: "",
    partnerAbroadSince: "",
  },
  parentsInformation: {
    isReceivingAid: null,
    fullName: "",
    fullAddress: "",
    cafNumber: "",
    socialSecurityNumber: "",
  },
  employmentSituation: {
    currentStatus: "",
    contractType: "",
    startDate: "",
    endDate: "",
    socialContribution: "",
    foreignContributionCountry: "",
  },
  declaration: {
    placeOfSignature: "",
    dateOfSignature: "",
    signature: "",
    declarationAccepted: false,
  },
});

export const isStepValid = (step: number, data: FormData): boolean => {
  const p = data.personalDetails;
  const p2 = data.partnerSpouse;
  const p3 = data.msaRegistration;
  const p4 = data.contactInformation;

  switch (step) {
    case 1:
      return (
        p.title.trim() !== "" &&
        p.firstName.trim() !== "" &&
        p.lastName.trim() !== "" &&
        p.dob !== null &&
        p.countryOfBirth.trim() !== "" &&
        p.maritalStatus.trim() !== "" &&
        p.socialSecurityNumber.trim() !== "" &&
        p.dateOfArrival !== null
      );
    case 2:
      return (
        p2.title.trim() !== "" &&
        p2.firstName.trim() !== "" &&
        p2.lastName.trim() !== "" &&
        p2.dob !== null &&
        p2.countryOfBirth.trim() !== "" &&
        p2.maritalStatus.trim() !== "" &&
        p2.socialSecurityNumber.trim() !== "" &&
        p2.dateOfArrival !== null
      );

    case 3:
      return (
        p3.organizationName.trim() !== "" &&
        p3.organizationCountry.trim() !== "" &&
        p3.beneficiaryNumber.trim() !== ""
      );

    case 4:
      return (
        p4.fullAddress.trim() !== "" &&
        p4.city.trim() !== "" &&
        p4.postCode.trim() !== "" &&
        p4.phone.trim() !== "" &&
        p4.email.trim() !== "" &&
        p4.addressSince.trim() !== "" &&
        p4.isCouple !== null &&
        p4.numberOfChildren.trim() !== "" &&
        p4.householdSize.trim() !== "" &&
        (p4.partnerAbroadCountry.trim() === "" ||
          p4.partnerAbroadSince.trim() !== "")
      );

    case 5:
      const p5 = data.parentsInformation;
      return (
        p5.isReceivingAid !== null &&
        p5.fullName.trim() !== "" &&
        p5.fullAddress.trim() !== "" &&
        p5.cafNumber.trim() !== "" &&
        p5.socialSecurityNumber.trim() !== ""
      );

    case 6:
      const p6 = data.employmentSituation;
      return (
        p6.currentStatus.trim() !== "" &&
        p6.contractType.trim() !== "" &&
        p6.startDate.trim() !== "" &&
        p6.socialContribution.trim() !== "" &&
        p6.foreignContributionCountry.trim() !== ""
      );
    case 7:
      const p7 = data.declaration;
      return (
        p7.placeOfSignature.trim() !== "" &&
        p7.dateOfSignature.trim() !== "" &&
        p7.signature.trim() !== "" &&
        p7.declarationAccepted === true
      );
    case 8:
    // return data.declarationAccepted;

    default:
      return false;
  }
};
