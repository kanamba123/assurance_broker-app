import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Remplacez le champ de date par un DatePicker
<DatePicker
    selected={new Date(bankPaymentInfo.bordereauDate)}
    onChange={date => setBankPaymentInfo(prevInfo => ({
        ...prevInfo,
        bordereauDate: date.toISOString().split('T')[0] // Format yyyy-mm-dd
    }))}
    dateFormat="yyyy-MM-dd"
    className="form-control mb-4"
/>
