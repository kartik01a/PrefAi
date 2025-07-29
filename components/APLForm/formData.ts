export type ChildDetail = {
  name: string;
  dob: string;
};

export type ApplicantCandidate = {
  nameOfTheNonProfitInstitution: string;
  nameAndTitleOfThePersonInChargeOfTheProject: string;
  fullAddress: string;
  telephone: string;
  fax: string;
  Email: string;
  website: string;
};

export type InstituteType = {
  museum: string;
  artCenter: string;
  alternativeSpace: string;
  others: string;
  projectTitle: string;
  nameOfTheFrenchArtist: string;
  exactProjectDates: string | null;
};

export type ProjectCategories = {
  soloExhibit: string;
  painting: string;
  photography: string;
  groupExhibit: string;
  artPublication: string;
  vidoNewMdia: string;
  Residency: string;
  TravelingExhibit: string;
  installation: string;
  performance: string;
  other: string;
};

export type Budget = {
  shippingOfTheWorks: string;
  insurance: string;
  perDiemOfTheArtists: string;
  travel: string;
  costsOfInstallingTheExchibition: string;
  other: string;
  total: string;
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
  instituteType: InstituteType;
  projectCategories: ProjectCategories;
  budget: Budget;
  contractAgreement: ContractAgreement;
  declaration: Declaration;
};

export const getInitialFormData = (): FormData => ({
  applicantCandidate: {
    nameOfTheNonProfitInstitution: "",
    nameAndTitleOfThePersonInChargeOfTheProject: "",
    fullAddress: "",
    telephone: "",
    fax: "",
    Email: "",
    website: "",
  },

  instituteType: {
    museum: "",
    artCenter: "",
    alternativeSpace: "",
    others: "",
    projectTitle: "",
    nameOfTheFrenchArtist: "",
    exactProjectDates: null,
  },

  projectCategories: {
    soloExhibit: "",
    painting: "",
    photography: "",
    groupExhibit: "",
    artPublication: "",
    vidoNewMdia: "",
    Residency: "",
    TravelingExhibit: "",
    installation: "",
    performance: "",
    other: "",
  },

  budget: {
    shippingOfTheWorks: "",
    insurance: "",
    perDiemOfTheArtists: "",
    travel: "",
    costsOfInstallingTheExchibition: "",
    other: "",
    total: "",
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
});

export const isStepValid = (step: number, data: FormData): boolean => {
  const p = data.applicantCandidate;
  const p2 = data.instituteType;
  const p3 = data.projectCategories;
  const p5 = data.budget;
  const p6 = data.contractAgreement;

  switch (step) {
    case 1:
      return (
        p.nameOfTheNonProfitInstitution.trim() !== "" &&
        p.nameAndTitleOfThePersonInChargeOfTheProject.trim() !== "" &&
        p.fullAddress.trim() !== "" &&
        p.telephone !== null &&
        p.fax.trim() !== "" &&
        p.Email.trim() !== "" &&
        p.website.trim() !== ""
      );
    case 2:
      return (
        (p2.museum.trim() !== "" ||
          p2.artCenter.trim() !== "" ||
          p2.alternativeSpace.trim() !== "" ||
          p2.others.trim() !== "") &&
        p2.projectTitle.trim() !== "" &&
        p2.nameOfTheFrenchArtist.trim() !== "" &&
        p2.exactProjectDates !== null
      );

    case 3:
      return (
        p3.soloExhibit.trim() !== "" ||
        p3.painting.trim() !== "" ||
        p3.groupExhibit.trim() !== "" ||
        p3.artPublication.trim() !== "" ||
        p3.vidoNewMdia.trim() !== "" ||
        p3.Residency.trim() !== "" ||
        p3.TravelingExhibit.trim() !== "" ||
        p3.installation.trim() !== "" ||
        p3.performance.trim() !== "" ||
        p3.other.trim() !== ""
      );

    case 4:
      return true;

    case 5:
      return (
        p5.shippingOfTheWorks.trim() !== "" &&
        p5.insurance.trim() !== "" &&
        p5.perDiemOfTheArtists.trim() !== "" &&
        p5.travel.trim() !== "" &&
        p5.costsOfInstallingTheExchibition.trim() !== "" &&
        p5.other.trim() !== "" &&
        p5.total !== null
      );

    case 6:
      return (
        p6.nameAndTittleOfThePersonQualifiedToSignAGrantAgreementWithFace.trim() !==
          "" && p6.grantsPayableTo.trim() !== ""
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
