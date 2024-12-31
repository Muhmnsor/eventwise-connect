import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { RegistrationActions } from "./RegistrationActions";

interface RegistrationTableRowProps {
  registration: {
    id: string;
    arabic_name: string;
    english_name?: string;
    email: string;
    phone: string;
    education_level?: string;
    birth_date?: string;
    national_id?: string;
    gender?: string;
    work_status?: string;
    registration_number: string;
    created_at: string;
  };
  editingId: string | null;
  editForm: any;
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  onEditFormChange: (field: string, value: string) => void;
}

export const RegistrationTableRow = ({
  registration,
  editingId,
  editForm,
  loading,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onEditFormChange,
}: RegistrationTableRowProps) => {
  const isEditing = editingId === registration.id;
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ar });
    } catch (error) {
      return dateString || '-';
    }
  };

  const renderCell = (value: string | undefined) => value || '-';

  const translateEducationLevel = (level?: string) => {
    switch (level) {
      case 'primary': return 'ابتدائي';
      case 'intermediate': return 'متوسط';
      case 'high_school': return 'ثانوي';
      case 'bachelor': return 'بكالوريوس';
      case 'master': return 'ماجستير';
      case 'phd': return 'دكتوراه';
      default: return '-';
    }
  };

  const translateWorkStatus = (status?: string) => {
    switch (status) {
      case 'employed': return 'موظف';
      case 'unemployed': return 'غير موظف';
      case 'student': return 'طالب';
      case 'retired': return 'متقاعد';
      default: return '-';
    }
  };

  if (isEditing) {
    return (
      <TableRow>
        <TableCell>
          <input
            type="text"
            value={editForm.arabicName}
            onChange={(e) => onEditFormChange("arabicName", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </TableCell>
        <TableCell>
          <input
            type="text"
            value={editForm.englishName}
            onChange={(e) => onEditFormChange("englishName", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </TableCell>
        <TableCell>
          <input
            type="email"
            value={editForm.email}
            onChange={(e) => onEditFormChange("email", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </TableCell>
        <TableCell>
          <input
            type="tel"
            value={editForm.phone}
            onChange={(e) => onEditFormChange("phone", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </TableCell>
        <TableCell>
          <input
            type="text"
            value={editForm.educationLevel}
            onChange={(e) => onEditFormChange("educationLevel", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </TableCell>
        <TableCell>
          <input
            type="date"
            value={editForm.birthDate}
            onChange={(e) => onEditFormChange("birthDate", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </TableCell>
        <TableCell>
          <input
            type="text"
            value={editForm.nationalId}
            onChange={(e) => onEditFormChange("nationalId", e.target.value)}
            className="w-full p-2 border rounded"
          />
        </TableCell>
        <TableCell>
          <select
            value={editForm.gender}
            onChange={(e) => onEditFormChange("gender", e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">اختر</option>
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </TableCell>
        <TableCell>
          <select
            value={editForm.workStatus}
            onChange={(e) => onEditFormChange("workStatus", e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">اختر</option>
            <option value="employed">موظف</option>
            <option value="unemployed">غير موظف</option>
            <option value="student">طالب</option>
            <option value="retired">متقاعد</option>
          </select>
        </TableCell>
        <TableCell>{registration.registration_number}</TableCell>
        <TableCell>{formatDate(registration.created_at)}</TableCell>
        <TableCell>
          <RegistrationActions
            isEditing={isEditing}
            loading={loading}
            onEdit={onEdit}
            onDelete={onDelete}
            onSave={onSave}
            onCancel={onCancel}
          />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>{renderCell(registration.arabic_name)}</TableCell>
      <TableCell>{renderCell(registration.english_name)}</TableCell>
      <TableCell>{renderCell(registration.email)}</TableCell>
      <TableCell>{renderCell(registration.phone)}</TableCell>
      <TableCell>{renderCell(translateEducationLevel(registration.education_level))}</TableCell>
      <TableCell>{registration.birth_date ? formatDate(registration.birth_date) : '-'}</TableCell>
      <TableCell>{renderCell(registration.national_id)}</TableCell>
      <TableCell>{renderCell(registration.gender === 'male' ? 'ذكر' : registration.gender === 'female' ? 'أنثى' : '')}</TableCell>
      <TableCell>{renderCell(translateWorkStatus(registration.work_status))}</TableCell>
      <TableCell>{renderCell(registration.registration_number)}</TableCell>
      <TableCell>{formatDate(registration.created_at)}</TableCell>
      <TableCell>
        <RegistrationActions
          isEditing={isEditing}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
          onSave={onSave}
          onCancel={onCancel}
        />
      </TableCell>
    </TableRow>
  );
};