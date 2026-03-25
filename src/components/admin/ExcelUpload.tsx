import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { ArrowUpTrayIcon, DocumentTextIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { graduateApi, GraduateData } from '../../services/api';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

const REQUIRED_COLUMNS = ['name', 'graduationYear', 'degree', 'major', 'employmentStatus'];
const EMPLOYMENT_STATUS_VALUES = ['employed', 'unemployed', 'further_study'];

const ExcelUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<GraduateData[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const validateData = useCallback((data: GraduateData[]): ValidationResult => {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    if (data.length === 0) {
      errors.push('No data found in the file');
      return { isValid: false, errors, warnings };
    }

    // Validate required columns exist
    const firstRow = data[0];
    const missingColumns = REQUIRED_COLUMNS.filter(col => !(col in firstRow));
    if (missingColumns.length > 0) {
      errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
    }

    // Validate each row
    data.forEach((row, index) => {
      const rowIndex = index + 2; // Excel rows are 1-indexed, plus header row
      
      // Validate name
      if (!row.name || typeof row.name !== 'string' || row.name.trim() === '') {
        errors.push(`Row ${rowIndex}: Name is required`);
      }
      
      // Validate graduation year
      if (!row.graduationYear || isNaN(row.graduationYear)) {
        errors.push(`Row ${rowIndex}: Valid graduation year is required`);
      } else if (row.graduationYear < 2000 || row.graduationYear > new Date().getFullYear() + 1) {
        warnings.push(`Row ${rowIndex}: Graduation year seems unusual (${row.graduationYear})`);
      }
      
      // Validate degree
      if (!row.degree || typeof row.degree !== 'string' || row.degree.trim() === '') {
        errors.push(`Row ${rowIndex}: Degree is required`);
      }
      
      // Validate major
      if (!row.major || typeof row.major !== 'string' || row.major.trim() === '') {
        errors.push(`Row ${rowIndex}: Major is required`);
      }
      
      // Validate employment status
      if (!row.employmentStatus || !EMPLOYMENT_STATUS_VALUES.includes(row.employmentStatus)) {
        errors.push(`Row ${rowIndex}: Employment status must be one of: ${EMPLOYMENT_STATUS_VALUES.join(', ')}`);
      }
      
      // Conditional validation based on employment status
      if (row.employmentStatus === 'employed') {
        if (!row.company || typeof row.company !== 'string' || row.company.trim() === '') {
          warnings.push(`Row ${rowIndex}: Company name recommended for employed graduates`);
        }
        if (row.salary && (isNaN(row.salary) || row.salary <= 0)) {
          warnings.push(`Row ${rowIndex}: Salary should be a positive number`);
        }
      } else if (row.employmentStatus === 'further_study') {
        if (!row.furtherStudyInstitution || typeof row.furtherStudyInstitution !== 'string' || row.furtherStudyInstitution.trim() === '') {
          warnings.push(`Row ${rowIndex}: Further study institution recommended`);
        }
        if (!row.furtherStudyProgram || typeof row.furtherStudyProgram !== 'string' || row.furtherStudyProgram.trim() === '') {
          warnings.push(`Row ${rowIndex}: Further study program recommended`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedFile = files[0];
    setFile(uploadedFile);
    setIsProcessing(true);
    setSubmitResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        // Transform data to expected format
        const transformedData: GraduateData[] = jsonData.map((row, index) => ({
          id: `temp_${index}`,
          name: row.name || '',
          graduationYear: typeof row.graduationYear === 'number' ? row.graduationYear : parseInt(row.graduationYear) || 0,
          degree: row.degree || '',
          major: row.major || '',
          employmentStatus: row.employmentStatus || 'unemployed',
          company: row.company || undefined,
          salary: row.salary ? parseFloat(row.salary) : undefined,
          location: row.location || undefined,
          furtherStudyInstitution: row.furtherStudyInstitution || undefined,
          furtherStudyProgram: row.furtherStudyProgram || undefined,
        })).filter(row => row.name || row.graduationYear); // Remove completely empty rows

        setPreviewData(transformedData);
        const validation = validateData(transformedData);
        setValidationResult(validation);
      } catch (error) {
        console.error('Error processing file:', error);
        setValidationResult({
          isValid: false,
          errors: ['Failed to process Excel file. Please ensure it is a valid .xlsx or .xls file.'],
          warnings: []
        });
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsArrayBuffer(uploadedFile);
  }, [validateData]);

  const clearFile = useCallback(() => {
    setFile(null);
    setPreviewData([]);
    setValidationResult(null);
    setSubmitResult(null);
    const fileInput = document.getElementById('excel-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }, []);

  const handleSubmitData = async () => {
    if (!validationResult?.isValid || previewData.length === 0) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await graduateApi.uploadGraduateData(previewData);
      setSubmitResult({
        success: response.success,
        message: response.message || 'Data uploaded successfully!'
      });
      
      if (response.success) {
        // Clear the form on successful submission
        setTimeout(clearFile, 2000);
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to upload data'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
        <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-900">Upload Graduate Data</h3>
          <p className="text-sm text-gray-500">
            Upload an Excel file (.xlsx or .xls) with graduate information
          </p>
          <input
            id="excel-upload"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="sr-only"
          />
          <label
            htmlFor="excel-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Choose File
          </label>
        </div>
        {file && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {file.name}
          </p>
        )}
      </div>

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Processing file...</span>
        </div>
      )}

      {/* Submit Result */}
      {submitResult && (
        <div className={`p-4 rounded-lg ${
          submitResult.success 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center">
            {submitResult.success ? (
              <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
            ) : (
              <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
            )}
            <span className="font-medium">{submitResult.message}</span>
          </div>
        </div>
      )}

      {/* Validation Results */}
      {validationResult && (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            validationResult.isValid 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center">
              {validationResult.isValid ? (
                <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <ExclamationTriangleIcon className="h-5 w-5 text-red-600 mr-2" />
              )}
              <span className="font-medium">
                {validationResult.isValid ? 'File Validated Successfully' : 'Validation Errors Found'}
              </span>
            </div>
            {validationResult.errors.length > 0 && (
              <ul className="mt-2 space-y-1">
                {validationResult.errors.map((error, index) => (
                  <li key={index} className="text-sm text-red-700 flex items-start">
                    <span className="mr-2">•</span>
                    {error}
                  </li>
                ))}
              </ul>
            )}
            {validationResult.warnings.length > 0 && (
              <ul className="mt-2 space-y-1">
                {validationResult.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-yellow-700 flex items-start">
                    <span className="mr-2">•</span>
                    {warning}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={clearFile}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Clear File
            </button>
            {validationResult.isValid && (
              <button
                onClick={handleSubmitData}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Data'
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Data Preview */}
      {previewData.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Data Preview ({previewData.length} records)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Major</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {previewData.slice(0, 10).map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.graduationYear}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.degree}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.major}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        row.employmentStatus === 'employed' 
                          ? 'bg-green-100 text-green-800' 
                          : row.employmentStatus === 'further_study'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {row.employmentStatus.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
                {previewData.length > 10 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-sm text-gray-500 text-center">
                      ... and {previewData.length - 10} more records
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;