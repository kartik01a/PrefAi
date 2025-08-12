export type ChildDetail = {
  name: string;
  dob: string;
};

export type ApplicantCandidate = {
  cafBeneficiary: string;
  msaBeneficiary: string;
  title: string;
  firstName: string;
  usedName: string;
  lastName: string;
  dateOfBirth: string | null;
  countryOfBirth: string;
  martialStatus: string;
  socialSecurityNumber: string;
  numberOfHouseholdMembers: string;
  fullAddress: string;
};

export type HousingDetails = {
  typeOfHousing: string;
  typeOfLease: string;
  moveInDate: string | null;
  rentAmount: string;
  chargesIfApplicable: string;
  directPaymentByCAF: string;
};

export type ApplicantSituation = {
  incomeAndResourcesForThePastYearOrLast12Months: string;
  employmentStatus: string;
  socialSecurityCoverage: string;
};

export type RentalContext = {
  mainSourceOfFunding: string;
  isRentPaidDirectly: string;
  coLesseDetailsIfColocated: string;
};

export type ContractAgreement = {
  nameAndTittleOfThePersonQualifiedToSignAGrantAgreementWithFace: string;
  grantsPayableTo: string;
};

export type Declaration = {
  placeOfSignature: string;
  dateOfSignature: string;
  signature: string;
  declarationAccepted: boolean;
};

export type FormData = {
  applicantCandidate: ApplicantCandidate;
  housingDetails: HousingDetails;
  applicantSituation: ApplicantSituation;
  rentalContext: RentalContext;
  contractAgreement: ContractAgreement;
  declaration: Declaration;
  document: { uri: string };
};

export const getInitialFormData = (): FormData => ({
  applicantCandidate: {
    cafBeneficiary: "",
    msaBeneficiary: "",
    title: "",
    firstName: "",
    usedName: "",
    lastName: "",
    dateOfBirth: null,
    countryOfBirth: "",
    martialStatus: "",
    socialSecurityNumber: "",
    numberOfHouseholdMembers: "",
    fullAddress: "",
  },

  housingDetails: {
    typeOfHousing: "",
    typeOfLease: "",
    moveInDate: null,
    rentAmount: "",
    chargesIfApplicable: "",
    directPaymentByCAF: "",
  },

  applicantSituation: {
    incomeAndResourcesForThePastYearOrLast12Months: "",
    employmentStatus: "",
    socialSecurityCoverage: "",
  },

  rentalContext: {
    mainSourceOfFunding: "",
    isRentPaidDirectly: "",
    coLesseDetailsIfColocated: "",
  },
  contractAgreement: {
    nameAndTittleOfThePersonQualifiedToSignAGrantAgreementWithFace: "",
    grantsPayableTo: "",
  },
  declaration: {
    placeOfSignature: "",
    dateOfSignature: "",
    signature: "",
    declarationAccepted: false,
  },
  document: {
    uri: "",
  },
});

export const isStepValid = (step: number, data: FormData): boolean => {
  const p = data.applicantCandidate;
  const p2 = data.housingDetails;
  const p3 = data.applicantSituation;
  const p4 = data.rentalContext;
  const p6 = data.declaration;

  switch (step) {
    case 1:
      return (
        p.cafBeneficiary.trim() !== "" &&
        p.msaBeneficiary.trim() !== "" &&
        p.title.trim() !== "" &&
        p.firstName.trim() !== "" &&
        p.usedName !== null &&
        p.lastName.trim() !== "" &&
        p.martialStatus.trim() !== "" &&
        p.socialSecurityNumber.trim() !== "" &&
        p.numberOfHouseholdMembers.trim() !== "" &&
        p.fullAddress.trim() !== "" &&
        p.dateOfBirth !== null &&
        p.countryOfBirth.trim() !== ""
      );
    case 2:
      return (
        p2.typeOfHousing.trim() !== "" &&
        p2.typeOfLease.trim() !== "" &&
        p2.moveInDate !== null &&
        p2.rentAmount.trim() !== "" &&
        p2.chargesIfApplicable.trim() !== "" &&
        p2.directPaymentByCAF.trim() !== ""
      );

    case 3:
      return (
        p3.incomeAndResourcesForThePastYearOrLast12Months.trim() !== "" ||
        p3.employmentStatus.trim() !== "" ||
        p3.socialSecurityCoverage.trim() !== ""
      );

    case 4:
      return (
        p4.mainSourceOfFunding.trim() !== "" ||
        p4.isRentPaidDirectly.trim() !== ""
      );

    case 5:
      return true;

    case 6:
      return (
        p6.placeOfSignature.trim() !== "" &&
        p6.dateOfSignature.trim() !== "" &&
        p6.signature.trim() !== "" &&
        p6.declarationAccepted === true
      );
    case 7:
      return true;

    default:
      return false;
  }
};
