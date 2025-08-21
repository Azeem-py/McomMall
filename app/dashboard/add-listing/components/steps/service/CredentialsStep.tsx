import React from 'react';
import { ListingFormData, Media, ServiceProviderData } from '../../../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, FileText } from 'lucide-react';

interface StepProps {
  formData: ListingFormData;
  setFormData: React.Dispatch<React.SetStateAction<ListingFormData>>;
  errors: Record<string, string>;
}

interface MultiFileUploadProps {
    id: 'insuranceCertificates' | 'qualifications';
    title: string;
    description: string;
    files: Media[];
    onFilesChange: (id: 'insuranceCertificates' | 'qualifications', files: Media[]) => void;
}

const MultiFileUpload: React.FC<MultiFileUploadProps> = ({ id, title, description, files, onFilesChange }) => {

    const addFile = () => {
        onFilesChange(id, [...files, { file: null, altText: '' }]);
    };

    const removeFile = (index: number) => {
        onFilesChange(id, files.filter((_, i) => i !== index));
    };

    const handleFileChange = (index: number, file: File | null) => {
        const newFiles = [...files];
        newFiles[index].file = file;
        onFilesChange(id, newFiles);
    };

    const handleAltTextChange = (index: number, altText: string) => {
        const newFiles = [...files];
        newFiles[index].altText = altText;
        onFilesChange(id, newFiles);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {files.map((media, index) => (
                    <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 flex items-center justify-center bg-muted rounded-lg">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="flex-grow space-y-2">
                           <Label htmlFor={`${id}-${index}-alt`}>Certificate/Qualification Name</Label>
                           <Input
                                id={`${id}-${index}-alt`}
                                placeholder="e.g., Gas Safe Register, NVQ Level 3 Plumbing"
                                value={media.altText}
                                onChange={(e) => handleAltTextChange(index, e.target.value)}
                           />
                           <Label htmlFor={`${id}-${index}-file`}>File (PDF, JPG, PNG)</Label>
                           <Input
                                id={`${id}-${index}-file`}
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
                           />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                    </div>
                ))}
                 <Button variant="outline" onClick={addFile}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Document
                </Button>
            </CardContent>
        </Card>
    )
}

const CredentialsStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
}) => {
  const serviceData = formData.serviceData || {};

  const handleFilesChange = (id: 'insuranceCertificates' | 'qualifications', files: Media[]) => {
      setFormData(prev => ({
          ...prev,
          serviceData: {
              ...prev.serviceData,
              [id]: files,
          }
      }))
  }

  return (
    <div className="space-y-6">
      <MultiFileUpload
        id="insuranceCertificates"
        title="Insurance & Certifications"
        description="Upload any insurance documents or industry certifications (optional)."
        files={serviceData.insuranceCertificates || []}
        onFilesChange={handleFilesChange}
      />
      <MultiFileUpload
        id="qualifications"
        title="Qualifications"
        description="Upload any relevant qualifications or awards (optional)."
        files={serviceData.qualifications || []}
        onFilesChange={handleFilesChange}
      />
    </div>
  );
};

export default CredentialsStep;
