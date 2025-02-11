import Navbar from "./Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateField, resetForm, addForm } from "../features/todoSlice.js";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { useState } from "react";

const DataForm = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.form.currentForm);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const handleDateChange = (date, field) => {
    const formattedDate = date ? date.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }) : '';
    dispatch(updateField({ name: field, value: formattedDate }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startRange = parseInt(currentForm.startRange) || 1;
    const loopCount = parseInt(currentForm.loopCount) || 1;

    if (startRange > loopCount) {
      Swal.fire({
        title: 'Invalid Range',
        text: 'Please enter a starting range lower than or equal to the number of copies',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#9333EA',
        background: '#1F2937',
        color: '#E9D5FF',
        customClass: {
          popup: 'rounded-xl border border-purple-500/30',
          title: 'text-purple-200 font-bold',
          htmlContainer: 'text-purple-100'
        }
      });
      return;
    }

    const rangeDifference = loopCount - startRange;
    if (rangeDifference >= 1185) {
      Swal.fire({
        title: 'Invalid Range Difference',
        text: 'The difference between starting and ending range cannot be more than 1185 copies',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#9333EA',
        background: '#1F2937',
        color: '#E9D5FF',
        customClass: {
          popup: 'rounded-xl border border-purple-500/30',
          title: 'text-purple-200 font-bold',
          htmlContainer: 'text-purple-100'
        }
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      dispatch(addForm({ count: loopCount }));
      
      await new Promise(resolve => setTimeout(resolve, 7000));
      navigate("/data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    dispatch(resetForm());
  };

  

  const inputFields = [
    { name: 'startRange',              label: 'Starting Range',            type: 'number', min: '1' },
    { name: 'loopCount',               label: 'Ending Range',          type: 'number', min: '1' },
    { name: 'invoiceNo',               label: 'Invoice No.',               type: 'text' },
    { name: 'ProductName',             label: 'Product Name',              type: 'text' },
    { name: 'genericName',             label: 'GENERIC NAME',              type: 'text' },
    { name: 'batchNo',                 label: 'BATCH NO.',                 type: 'text' },
    { name: 'quantity',                label: 'QUANTITY',                  type: 'text' },
    { name: 'caseNo',                  label: 'CASE NO.',                  type: 'text' },
    { name: 'MFGdate',                 label: 'MFG. DT.',                 type: 'date' },
    { name: 'EXPdate',                 label: 'EXP. DT.',                 type: 'date' },
    { name: 'NetWT',                   label: 'NET. WT.',                  type: 'number', min: '0' },
    { name: 'grossWT',                 label: 'GROSS. WT.',                type: 'number', min: '0' },
    { name: 'companyName',             label: 'Consignee: Company Name',   type: 'text' },
    { name: 'companyAddress',          label: 'Consignee: Address',        type: 'text' },
    { name: 'companyCountryAndRegion', label: 'Consignee: Country & Region', type: 'text' }
  ];

  const commonInputClasses = "bg-gray-900/50 border border-purple-500/30 text-purple-100 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3 transition-all duration-200 hover:bg-gray-800/50";
  const commonLabelClasses = "block mb-2 text-sm font-medium text-purple-200";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 backdrop-blur-md bg-black/40 p-8 rounded-2xl border-2 border-purple-500/30 shadow-2xl">
            <h2 className="text-2xl font-bold text-center text-purple-200 mb-8">Data Entry Form</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map(field => (
                <div key={field.name} className="space-y-2">
                  <label className={commonLabelClasses}>
                    {field.label}
                  </label>
                  {field.type === 'date' ? (
                    <DatePicker
                      selected={currentForm[field.name] ? new Date(currentForm[field.name].split('/')[0] + '/01/' + currentForm[field.name].split('/')[1]) : null}
                      onChange={(date) => handleDateChange(date, field.name)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      className={commonInputClasses}
                      placeholderText={`Select ${field.label.toUpperCase()}`}
                      required
                      popperClassName="date-picker-popper"
                      calendarClassName="bg-gray-900 border border-purple-500/30 rounded-lg shadow-xl"
                      dayClassName={date => "text-purple-200 hover:bg-purple-700"}
                    />
                  ) : (
                    <input
                      name={field.name}
                      type={field.type}
                      min={field.min}
                      className={commonInputClasses}
                      placeholder={`Enter ${field.label}`}
                      value={currentForm[field.name]}
                      onChange={handleInput}
                      required
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-500/50 transition-all duration-200 font-medium text-sm shadow-lg shadow-purple-500/30 relative ${isSubmitting ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="opacity-0">Submit Form</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </>
                ) : (
                  'Submit Form'
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                disabled={isSubmitting}
                className={`px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-500/50 transition-all duration-200 font-medium text-sm shadow-lg shadow-gray-500/30 ${isSubmitting ? 'cursor-not-allowed opacity-80' : ''}`}
              >
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataForm;
