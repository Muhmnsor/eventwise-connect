import { EnglishNameField } from "@/components/shared/fields/EnglishNameField";
import { EducationLevelField } from "./optional/EducationLevelField";
import { BirthDateField } from "./optional/BirthDateField";
import { NationalIdField } from "./optional/NationalIdField";
import { GenderField } from "./optional/GenderField";
import { WorkStatusField } from "./optional/WorkStatusField";

interface OptionalRegistrationFieldsProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  registrationFields: {
    english_name: boolean;
    education_level: boolean;
    birth_date: boolean;
    national_id: boolean;
    gender: boolean;
    work_status: boolean;
  };
}

export const OptionalRegistrationFields = ({
  formData,
  handleInputChange,
  registrationFields
}: OptionalRegistrationFieldsProps) => {
  console.log('📝 OptionalRegistrationFields - Form Data:', formData);
  console.log('🔄 OptionalRegistrationFields - Registration Fields:', registrationFields);

  return (
    <>
      {registrationFields.english_name && (
        <EnglishNameField
          value={formData.englishName}
          onChange={(value) => handleInputChange('englishName', value)}
        />
      )}

      {registrationFields.education_level && (
        <EducationLevelField
          value={formData.educationLevel}
          onChange={(value) => handleInputChange('educationLevel', value)}
        />
      )}

      {registrationFields.birth_date && (
        <BirthDateField
          value={formData.birthDate}
          onChange={(value) => handleInputChange('birthDate', value)}
        />
      )}

      {registrationFields.national_id && (
        <NationalIdField
          value={formData.nationalId}
          onChange={(value) => handleInputChange('nationalId', value)}
        />
      )}

      {registrationFields.gender && (
        <GenderField
          value={formData.gender}
          onChange={(value) => handleInputChange('gender', value)}
        />
      )}

      {registrationFields.work_status && (
        <WorkStatusField
          value={formData.workStatus}
          onChange={(value) => handleInputChange('workStatus', value)}
        />
      )}
    </>
  );
};