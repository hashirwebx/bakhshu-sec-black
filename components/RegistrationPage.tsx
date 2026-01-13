
import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowLeft, Camera, Download, MessageSquare, Send, Instagram, Facebook, Shield } from 'lucide-react';
import { Branch, RegistrationFormData } from '../types';
import { BRANCHES } from '../constants';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface RegistrationPageProps {
  onBack: () => void;
  defaultBranch?: Branch;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onBack, defaultBranch = 'soan' }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    fatherName: '',
    fatherProfession: '',
    dob: '',
    gender: 'Male',
    weight: '',
    height: '',
    nationality: 'Pakistani',
    qualification: '',
    address: '',
    phone: '',
    mobile: '',
    email: '',
    branch: defaultBranch,
    slot: BRANCHES[defaultBranch].slots[0],
    message: ''
  });

  const [passportPhoto, setPassportPhoto] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'branch' ? { slot: BRANCHES[value as Branch].slots[0] } : {})
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPassportPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendToWhatsApp = () => {
    const branchInfo = BRANCHES[formData.branch];
    const message = `*OFFICIAL ADMISSION NOTIFICATION - BAKHSHU TAEKWONDO*\n\n` +
      `Assalam-o-Alaikum Coach Basharat,\n\n` +
      `I have successfully completed the digital enrollment process for Bakhshu Taekwondo & Fitness Club. Please find my professional registration details below:\n\n` +
      `------------------------------------------\n` +
      `*STUDENT ENROLLMENT PROFILE*\n` +
      `------------------------------------------\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Father's Name:* ${formData.fatherName}\n` +
      `*Date of Birth:* ${formData.dob}\n` +
      `*Contact:* ${formData.mobile}\n` +
      `*Branch:* ${branchInfo.name}\n` +
      `*Slot:* ${formData.slot}\n` +
      `------------------------------------------\n\n` +
      `I have downloaded my digital admission form and will bring the printed copy to my first session.\n\n` +
      `Regards,\n` +
      `${formData.fullName}`;

    const whatsappUrl = `https://wa.me/923455304798?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const downloadFilledForm = async () => {
    if (!pdfTemplateRef.current) {
      console.error("PDF Template Reference not found.");
      return;
    }

    setIsGeneratingPDF(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const element = pdfTemplateRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 800,
        height: 1130,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / pageWidth;
      const imgHeight = canvasHeight / ratio;

      pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, Math.min(imgHeight, pageHeight));

      const fileName = `Bakhshu_Admission_${formData.fullName.trim().replace(/\s+/g, '_') || 'Student'}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF Generation Error:", err);
      alert("Encountered an issue while generating the PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F2429] text-white flex flex-col relative overflow-x-hidden">

      <div className="fixed -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary-red/5 blur-[150px] rounded-full pointer-events-none"></div>

      {isSubmitted ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-700">
          <div className="w-24 h-24 bg-primary-red/10 border border-primary-red/20 flex items-center justify-center mx-auto mb-10 shadow-[0_0_60px_rgba(255,60,60,0.2)]">
            <CheckCircle className="text-primary-red" size={48} />
          </div>
          <h2 className="text-6xl md:text-8xl font-bebas tracking-widest mb-6 uppercase">Registration <span className="text-primary-red">Success</span></h2>
          <p className="text-text-gray text-xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed uppercase tracking-tight">
            Your digital admission form has been generated. Please download your document and send the confirmation to the Coach.
          </p>

          <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
            <button
              onClick={downloadFilledForm}
              disabled={isGeneratingPDF}
              className="bg-white text-black p-8 font-black text-xs uppercase tracking-[0.4em] flex flex-col items-center justify-center space-y-4 hover:bg-gray-200 transition-all shadow-2xl disabled:opacity-50 group border border-transparent hover:border-black/10"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  <span>Generating PDF...</span>
                </div>
              ) : (
                <>
                  <Download size={24} className="group-hover:translate-y-1 transition-transform" />
                  <span>Download Admission PDF</span>
                </>
              )}
            </button>
            <button
              onClick={sendToWhatsApp}
              className="bg-[#25D366] text-white p-8 font-black text-xs uppercase tracking-[0.4em] flex flex-col items-center justify-center space-y-4 hover:bg-[#128C7E] transition-all shadow-2xl group border border-white/10"
            >
              <MessageSquare size={24} fill="white" className="group-hover:scale-110 transition-transform" />
              <span>Send to Coach (WhatsApp)</span>
            </button>
          </div>

          <div className="mt-16">
            <button onClick={onBack} className="text-white/20 hover:text-white font-black text-[10px] uppercase tracking-[0.8em] transition-colors border-b border-transparent hover:border-white">Return to Home</button>
          </div>
        </div>
      ) : (
        <div className="py-12 px-6 flex flex-col">
          <div className="max-w-[1000px] mx-auto w-full mb-8 flex justify-between items-center px-4 relative z-20">
            <button onClick={onBack} className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back</span>
            </button>
            <div className="flex items-center space-x-2">
              <img src="https://ik.imagekit.io/BakhshuTaekwondo/bakhshu?updatedAt=1767881121835" alt="Logo" className="w-6 h-6" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/60">Admission Portal</span>
            </div>
            <div className="w-20"></div>
          </div>

          <div className="max-w-[900px] mx-auto w-full bg-[#1F2429] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col">
            <div className="p-10 md:p-16 relative z-10">

              <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
                <div className="flex items-start space-x-8">
                  <img src="https://ik.imagekit.io/BakhshuTaekwondo/bakhshu?updatedAt=1767881121835" alt="Logo" className="w-28 h-28" />
                  <div className="pt-2">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-white mb-2">BAKHSHU <br />TAEKWONDO</h1>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-white/40 mb-4">& FITNESS CLUB</h2>
                    <div className="flex space-x-6 text-[8px] font-bold text-white/30 uppercase tracking-widest">
                      <span className="flex items-center space-x-1"><Instagram size={10} /> <span>@ bakhshutaekwondoclub</span></span>
                      <span className="flex items-center space-x-1"><Facebook size={10} /> <span>f bakhshutaekwondoclub</span></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-32 h-40 border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center cursor-pointer group hover:border-primary-red transition-all overflow-hidden relative"
                  >
                    {passportPhoto ? (
                      <img src={passportPhoto} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <Camera size={24} className="mx-auto text-white/20 mb-2 group-hover:text-primary-red transition-colors" />
                        <p className="text-[8px] font-black uppercase tracking-widest text-white/20 leading-tight">Add Photo</p>
                      </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mb-10">
                  {[
                    { label: 'Name', name: 'fullName', placeholder: "Student Full Name", required: true },
                    { label: "Father's Name", name: 'fatherName', placeholder: "Guardian Name", required: true },
                    { label: "Father's Profession", name: 'fatherProfession', placeholder: "Occupation" },
                    { label: "Date of Birth", name: 'dob', placeholder: "DD/MM/YYYY" },
                    { label: "Gender", name: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
                    { label: "Weight (kg)", name: 'weight', placeholder: "e.g. 40" },
                    { label: "Height", name: 'height', placeholder: "e.g. 5'0\"" },
                    { label: "Nationality", name: 'nationality', placeholder: "Pakistani" },
                    { label: "Qualification", name: 'qualification', placeholder: "School Grade" },
                    { label: "Mobile", name: 'mobile', placeholder: "03XXXXXXXXX", required: true },
                    { label: "Academy Branch", name: 'branch', type: 'select', options: ['soan', 'pindi'], optionLabels: ['Soan Garden (Islamabad)', 'Rawalpindi Branch'] },
                    { label: "Training Slot", name: 'slot', type: 'select', options: BRANCHES[formData.branch].slots },
                  ].map((field, i) => (
                    <div key={i} className="flex flex-col space-y-2 border-b border-white/10 pb-2">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">{field.label}</label>
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={(formData as any)[field.name]}
                          onChange={handleChange}
                          className="bg-transparent text-white font-bold text-sm outline-none appearance-none cursor-pointer"
                        >
                          {field.options?.map((opt, j) => (
                            <option key={j} value={opt} className="bg-[#111]">
                              {field.optionLabels ? field.optionLabels[j] : opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type || 'text'}
                          name={field.name}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={(formData as any)[field.name]}
                          onChange={handleChange}
                          className="bg-transparent text-white font-bold text-sm outline-none"
                        />
                      )}
                    </div>
                  ))}

                  <div className="md:col-span-2 flex flex-col space-y-2 border-b border-white/10 pb-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Current Address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-transparent text-white font-bold text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Professional block for Chief Instructor and Fees */}
                <div className="mb-12 border border-white/5 bg-white/[0.02] p-8 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-red">Chief Instructor</h4>
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-lg font-bold text-white uppercase tracking-tight">Basharat Ali Akhonzada</p>
                          <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Black Belt 4th Dan (W.T.F)</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-red">Official Fees</h4>
                      <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Admission</span>
                        <span className="text-base font-bold text-white tracking-tight">PKR {BRANCHES[formData.branch].fees.registration.split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Monthly</span>
                        <span className="text-lg font-bold text-primary-red tracking-tight">PKR {BRANCHES[formData.branch].fees.monthly.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-red hover:bg-red-700 text-white py-8 font-black text-sm uppercase tracking-[0.5em] transition-all flex items-center justify-center space-x-4 shadow-[0_20px_50px_rgba(255,60,60,0.25)]"
                >
                  <span>Submit Admission Form</span>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hidden PDF Template matches the physical form provided */}
      <div className="fixed left-[-9999px] top-0 pointer-events-none z-0">
        <div ref={pdfTemplateRef} className="w-[800px] bg-white p-14 text-black flex flex-col font-sans" style={{ minHeight: '1130px' }}>

          {/* Header matching physical layout */}
          <div className="flex justify-between items-start mb-12">
            <div className="w-24">
              <img
                src="https://ik.imagekit.io/BakhshuTaekwondo/bakhshu?updatedAt=1767881121835"
                alt="Logo"
                className="w-full"
                crossOrigin="anonymous"
              />
            </div>
            <div className="flex-1 text-center px-6 pt-2">
              <h1 className="text-[30px] font-black uppercase tracking-tight leading-none mb-1">BAKHSHU TAEKWONDO & FITNESS CLUB</h1>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500 mb-2 italic">Affiliated with ISLAMABAD TAEKWONDO ASSOCIATION</p>
              <div className="flex justify-center space-x-6 text-[10px] font-bold text-gray-400 italic">
                <span>@ bakhshutaekwondoclub</span>
                <span>f bakhshutaekwondoclub</span>
              </div>
              <div className="mt-8 inline-block border-2 border-black px-12 py-1.5">
                <h2 className="text-xl font-black uppercase tracking-[0.4em]">ADMISSION FORM</h2>
              </div>
            </div>
            <div className="w-32 h-40 border-2 border-black relative flex items-center justify-center bg-gray-50 overflow-hidden">
              {passportPhoto ? (
                <img src={passportPhoto} className="w-full h-full object-cover" crossOrigin="anonymous" />
              ) : (
                <div className="text-[12px] font-black text-gray-200 uppercase rotate-45 text-center px-4">2 PHOTOGRAPHS</div>
              )}
            </div>
          </div>

          {/* Decorative Calligraphy Background */}
          <div className="absolute right-12 top-[340px] flex flex-col text-[170px] font-serif text-gray-800 items-center leading-[0.8] select-none pointer-events-none font-bold opacity-80">
            <span>태</span><span>권</span><span>도</span>
          </div>

          {/* Form Fields Section */}
          <div className="flex-1 space-y-9 pr-48 relative z-10 pt-4">
            {[
              { l: "Name", v: formData.fullName },
              { l: "Father's Name", v: formData.fatherName },
              { l: "Father's Profession", v: formData.fatherProfession || '___________________________' },
              { l: "Date of Birth", v: formData.dob || '___________________________' },
              { l: "Gender", v: formData.gender },
            ].map((item, idx) => (
              <div key={idx} className="flex items-end">
                <span className="text-[15px] font-black uppercase min-w-[190px] leading-none mb-1">{item.l}:</span>
                <span className="flex-1 border-b border-black text-xl font-bold uppercase px-2 pb-1 leading-none">{item.v}</span>
              </div>
            ))}

            <div className="flex items-end space-x-4">
              <span className="text-[15px] font-black uppercase min-w-[190px] leading-none mb-1">Weight:</span>
              <span className="flex-1 border-b border-black text-xl font-bold uppercase px-2 pb-1 leading-none">{formData.weight || '_______'} Kg.</span>
              <span className="text-[15px] font-black uppercase px-6 leading-none mb-1">Height:</span>
              <span className="flex-1 border-b border-black text-xl font-bold uppercase px-2 pb-1 leading-none">{formData.height || '_______'}</span>
            </div>

            {[
              { l: "Nationality", v: formData.nationality || 'PAKISTANI' },
              { l: "Qualification", v: formData.qualification || '___________________________' },
              { l: "Address", v: formData.address || '________________________________________________________________________________', multiline: true },
              { l: "Phone", v: formData.phone || '___________________________' },
              { l: "Mobile", v: formData.mobile },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start flex-col space-y-1">
                <div className="flex items-end w-full">
                  <span className="text-[15px] font-black uppercase min-w-[190px] leading-none mb-1">{item.l}:</span>
                  <span className="flex-1 border-b border-black text-xl font-bold uppercase px-2 pb-1 leading-none">
                    {!item.multiline ? item.v : ''}
                  </span>
                </div>
                {item.multiline && (
                  <div className="border-b border-black w-full h-11 flex items-end text-xl font-bold uppercase px-2 pb-1">{item.v}</div>
                )}
              </div>
            ))}
          </div>

          {/* Official Oath matches physical form text */}
          <div className="mt-12 bg-gray-50/50 p-8 border border-gray-200">
            <h3 className="text-base font-black uppercase border-b-2 border-black inline-block mb-6 tracking-widest">TAEKWONDO STUDENT OATH</h3>
            <ul className="space-y-4 text-[13px] font-bold leading-relaxed uppercase tracking-wider text-gray-800">
              <li className="flex items-start">
                <span className="mr-3 font-black text-xl leading-none mt-[-2px]">*</span>
                <span>I know what Taekwondo represents, and I will listen and obey my Parents, Teachers, Master and Instructors.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-black text-xl leading-none mt-[-2px]">*</span>
                <span>I will demonstrate my Taekwondo discipline in the dojang, my school, and most importantly at home.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-black text-xl leading-none mt-[-2px]">*</span>
                <span>I will only use my Taekwondo ability to defend myself, never in an aggressive manner.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-black text-xl leading-none mt-[-2px]">*</span>
                <span>I will respect myself, my family, my school and my country.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 font-black text-xl leading-none mt-[-2px]">*</span>
                <span>I will always try my best in everything I do, including Taekwondo, School Studies and everything else.</span>
              </li>
              <li className="flex items-start mt-4 pt-4 border-t border-gray-200 italic font-black text-gray-600">
                <span className="mr-3 text-xl leading-none mt-[-2px]">*</span>
                <span>Children who do not obey their parents <span className="underline font-black">CHEERFULLY</span> may be reduced in Rank.</span>
              </li>
            </ul>
          </div>

          {/* Signatures exactly as shown in Screenshot 1 */}
          <div className="mt-20 grid grid-cols-2 gap-48">
            <div className="text-center">
              <div className="border-t border-black pt-2 mx-auto w-[280px]">
                <p className="text-[13px] font-bold uppercase tracking-widest text-gray-800">Parent's Signature</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-black pt-2 mx-auto w-[280px]">
                <p className="text-[13px] font-bold uppercase tracking-widest text-gray-800 mb-1">Chief Instructor's Signature</p>
                <p className="text-[17px] font-black uppercase text-black">Basharat Ali Akhonzada</p>
                <p className="text-[11px] font-bold uppercase text-gray-500">Black Belt 4th Dan ( W.T.F )</p>
              </div>
            </div>
          </div>

          {/* Fee Footer Section exactly as shown in Screenshot 1 */}
          <div className="mt-auto pt-16 text-[16px] font-black uppercase text-black tracking-tight">
            <div className="flex items-center whitespace-nowrap">
              <span className="font-black">FEE STRUCTURE:</span>
              <span className="ml-4">Admission</span>
              <span className="border-b border-black w-24 mx-2 mt-[-6px]"></span>
              <span className="ml-2">Monthly</span>
              <span className="border-b border-black w-36 mx-2 mt-[-6px]"></span>
              <span className="ml-2">Membership Card</span>
              <span className="border-b border-black flex-1 mx-2 mt-[-6px]"></span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RegistrationPage;
