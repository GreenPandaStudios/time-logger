import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getAllExperiences } from '../../state';
import { IExperience, IHaveId } from '../../types';
import { resolveUploadedData } from '../../state/experiences/experience-slice';

export const ExportImportData = () => {
    const dispatch = useAppDispatch();
    const experiences = useAppSelector(getAllExperiences);



    const exportData = useCallback(() => {
        const data = JSON.stringify(experiences);
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'experiences.json';
        a.click();
        URL.revokeObjectURL(url);
        document.removeChild(a);
    },[experiences]);

    const importData = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.[0];
            if (!file) return;
            try {
                const contents = await file.text();
                const data = JSON.parse(contents);
                if (!Array.isArray(data)) {
                    console.error('Invalid data format');
                    return;
                }
                
                const formattedData = data as (IExperience & IHaveId)[];
                dispatch(resolveUploadedData({experiences: formattedData}));
                
            } catch (error) {
                console.error('Error reading or parsing file:', error);
            }
        };
        input.click();
    }, [dispatch]);

    return (
        <div>
            <div className="d-flex flex-column align-items-center my-3">
                <div className="d-flex justify-content-around w-100 mb-2">
                    <Button disabled={experiences.length === 0} variant="outline-secondary" onClick={exportData} className="d-flex align-items-center">
                        <i className="bi bi-file-earmark-arrow-down me-2"></i> Download My Data
                    </Button>
                    <Button variant="outline-secondary" onClick={importData} className="d-flex align-items-center">
                        <i className="bi bi-file-earmark-arrow-up me-2"></i> Upload New Data
                    </Button>
                </div>
            </div>
        </div>
    );
};
