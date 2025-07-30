export type ChildDetail = {
  name: string;
  dob: string;
};

export type ApplicantCandidate = {
  cafBeneficiary: string;
  lastName: string;
  lastNameUppercase: string;
  dateOfBirth: string | null;
  employeeStatus: string;
};

export type ContactDetails = {
  fullAddress: string;
  streetNumber: string;
  postalCode: string;
  phoneNumber: string;
  streetName: string;
  city: string;
  email: string;
};

export type FamilySituation = {
  maritalStatus: string;
  spouseName: string;
  marriageDate: string | null;
};

export type AdditionalInformation = {
  debtDeclaration1: boolean;
  debtDeclaration2: boolean;
  repaymentTerms: string;
};
export type Declaration = {
  placeOfSignature: string;
  dateOfSignature: string;
  signature: string;
  declarationAccepted: boolean;
};

export type FormData = {
  applicantCandidate: ApplicantCandidate;
  contactDetails: ContactDetails;
  familySituation: FamilySituation;
  additionalInformation: AdditionalInformation;
  declaration: Declaration;
};

export const getInitialFormData = (): FormData => ({
  applicantCandidate: {
    cafBeneficiary: "",
    lastName: "",
    lastNameUppercase: "",
    dateOfBirth: null,
    employeeStatus: "",
  },
  contactDetails: {
    fullAddress: "",
    streetNumber: "",
    postalCode: "",
    phoneNumber: "",
    streetName: "",
    city: "",
    email: "",
  },
  familySituation: {
    maritalStatus: "",
    spouseName: "",
    marriageDate: null,
  },
  additionalInformation: {
    debtDeclaration1: false,
    debtDeclaration2: false,
    repaymentTerms: "",
  },
  declaration: {
    placeOfSignature: "",
    dateOfSignature: "",
    signature: "",
    declarationAccepted: false,
  },
});

export const isStepValid = (step: number, data: FormData): boolean => {
  const p1 = data.applicantCandidate;
  const p2 = data.contactDetails;
  const p3 = data.familySituation;
  const p4 = data.additionalInformation;
  const p5 = data.declaration;

  switch (step) {
    case 1:
      return (
        p1.cafBeneficiary.trim() !== "" &&
        p1.lastName.trim() !== "" &&
        p1.lastNameUppercase.trim() !== "" &&
        p1.dateOfBirth !== null &&
        p1.employeeStatus.trim() !== ""
      );

    case 2:
      return (
        p2.fullAddress.trim() !== "" &&
        p2.streetNumber.trim() !== "" &&
        p2.postalCode.trim() !== "" &&
        p2.phoneNumber.trim() !== "" &&
        p2.streetName.trim() !== "" &&
        p2.city.trim() !== "" &&
        p2.email.trim() !== ""
      );

    case 3:
      return (
        p3.maritalStatus.trim() !== "" &&
        p3.spouseName.trim() !== "" &&
        p3.marriageDate !== null
      );

    case 4:
      return (
        p4.debtDeclaration1 !== false &&
        p4.debtDeclaration2 !== false &&
        p4.repaymentTerms.trim() !== ""
      );

    case 5:
      return true;

    case 6:
      return (
        p5.placeOfSignature.trim() !== "" &&
        p5.dateOfSignature.trim() !== "" &&
        p5.signature.trim() !== "" &&
        p5.declarationAccepted === true
      );

    case 7:
      return true;

    default:
      return false;
  }
};
