
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { CustomerService } from '../services/customerServices';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Knob } from 'primereact/knob';

export default function CandidateList() {
    const [customers, setCustomers] = useState([]);

    const getSeverity = (status) => {
        switch (status) {
            case 'Closed':
                return 'danger';

            case 'Open to work':
                return 'success';
            default:
        }
    };

    useEffect(() => {
        CustomerService.getCustomersLarge().then((data) => setCustomers(getCustomers(data)));
    }, []);

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            return d;
        });
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };
    const rangeColor = (rewards) => {
        switch (rewards) {
            case '1':
                return "#f90000";
            case '2':
                return "#ff8989";
            case '3':
                return "#56eb76";
            case '4':
                return "#00d600";
            case '5':
                return "#129f30";
            default:
        }
    };

    const Marks = (rowData) => {
        return <Knob value={rowData.rewards} size={40} max={5} valueColor={rangeColor(rowData.rewards)} />;
    };

    const UploadFile = () => {
        const toast = useRef(null);
    
        const onUpload = (event) => {
            // Accessing the uploaded file
            const uploadedFiles = event.files;
            console.log('Uploaded files:', uploadedFiles);
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
        };
    
        const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'p-button-rounded p-button-outlined' };
    
        return (
            <div className="card flex justify-content-center">
                <Toast ref={toast}></Toast>
                {/* FileUpload component */}
                <FileUpload mode="basic" maxFileSize={1000000} onUpload={onUpload} auto chooseOptions={uploadOptions} />
            </div>
        );
    };
    

    return (
        <>
            <Card className="card list-card">
                <DataTable value={customers} paginator rows={10} scrollHeight="79vh" size='small'
                    paginatorTemplate="CurrentPageReport PrevPageLink NextPageLink RowsPerPageDropdown"
                    rowsPerPageOptions={[5, 10, 25, 50]} dataKey="id" selectionMode="checkbox"
                    emptyMessage="No customers found." currentPageReportTemplate="{totalRecords} Candidates" scrollable>
                    <Column field="name" header="Name" align='center' sortable style={{ minWidth: '10rem' }} frozen={true} />
                    <Column field="email" header="Email" align='center' sortable style={{ minWidth: '10rem' }} />
                    <Column field="job" header="Job Title" align='center' sortable style={{ minWidth: '10rem' }} />
                    <Column field="mobile" header="Mobile" align='center' style={{ minWidth: '10rem' }} />
                    <Column field="employability" header="Employability" align='center' style={{ minWidth: '10rem' }} />
                    <Column field="status" header="Status" align='center' sortable style={{ minWidth: '10rem' }} body={statusBodyTemplate} />
                    <Column field="rewards" header="Marks" align='center' style={{ minWidth: '8rem' }} body={Marks} />
                    <Column field="action" header="Action" align='center' style={{ minWidth: '1rem' }} body={UploadFile} alignFrozen="right" frozen={true} />
                </DataTable>
            </Card>
        </>
    );
}
