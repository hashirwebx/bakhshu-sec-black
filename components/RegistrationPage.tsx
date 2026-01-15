
import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Send, ArrowLeft, Printer, Camera, X, Download } from 'lucide-react';
import { Branch, RegistrationFormData } from '../types';
import { BRANCHES } from '../constants';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface RegistrationPageProps {
  onBack: () => void;
  defaultBranch?: Branch;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({ onBack, defaultBranch = 'soan' }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    phone: '',
    email: '',
    age: '',
    branch: defaultBranch,
    slot: BRANCHES[defaultBranch].slots[0],
    message: ''
  });

  const [passportPhoto, setPassportPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [extraData, setExtraData] = useState({
    fatherName: '',
    fatherProfession: '',
    dob: '',
    gender: '',
    weight: '',
    height: '',
    nationality: 'Pakistani',
    qualification: '',
    address: '',
    mobile: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    window.scrollTo(0, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in formData) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        ...(name === 'branch' ? { slot: BRANCHES[value as Branch].slots[0] } : {})
      }));
    } else {
      setExtraData(prev => ({ ...prev, [name]: value }));
    }
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

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPassportPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadFilledForm = async () => {
    if (!pdfTemplateRef.current) return;
    setIsGeneratingPDF(true);

    try {
      const canvas = await html2canvas(pdfTemplateRef.current, {
        scale: 2, // Optimized scale for the detailed "old" look
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Admission_Form_${formData.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const getWhatsAppLink = () => {
    const baseUrl = "https://wa.me/923350990834";
    const text = encodeURIComponent(
      `Assalam o Alaikum Coach! 
I have digitally submitted the Admission Form. 

📋 APPLICANT DETAILS:
- Name: ${formData.fullName}
- Father's Name: ${extraData.fatherName}
- DOB: ${extraData.dob}
- Gender: ${extraData.gender}
- Branch: ${BRANCHES[formData.branch].name}
- Selected Slot: ${formData.slot}
- Contact: ${formData.phone}
- Address: ${extraData.address}

I have also downloaded my official PDF form. I am attaching it to this chat now for your records. Please guide me further.`
    );
    return `${baseUrl}?text=${text}`;
  };

  return (
    <div className="h-screen bg-[#1C1F23] flex flex-col items-center overflow-hidden">
      <div className="fixed left-[-9999px] top-0">
        <div
          ref={pdfTemplateRef}
          className="w-[794px] h-[1123px] bg-white p-10 font-sans text-black flex flex-col overflow-hidden"
        >
          {/* Header Area */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-4">
              <img src="https://ik.imagekit.io/BakhshuTaekwondo/bakhshu?updatedAt=1767881121835" alt="Logo" className="w-20 h-20 object-contain" />
              <div className="text-left">
                <h1 className="text-4xl font-black leading-none uppercase tracking-tighter" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>BAKHSHU TAEKWONDO</h1>
                <h2 className="text-2xl font-black leading-none uppercase tracking-tighter">& FITNESS CLUB</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-1">Affiliated with ISLAMABAD TAEKWONDO ASSOCIATION</p>
                <p className="text-[9px] font-bold uppercase opacity-50">@ bakhshutaekwondoclub | f bakhshutaekwondoclub</p>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <h3 className="text-2xl font-black uppercase tracking-widest border-b-2 border-black pb-1 mb-4">ADMISSION FORM</h3>
              <div className="border-2 border-black w-32 h-44 flex items-center justify-center relative overflow-hidden bg-slate-50">
                {passportPhoto ? (
                  <img src={passportPhoto} className="w-full h-full object-cover" alt="Photo" />
                ) : (
                  <span className="text-[11px] font-black rotate-90 whitespace-nowrap opacity-20 uppercase">2 PHOTOGRAPH</span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-black mb-10"></div>

          {/* Form Fields */}
          <div className="flex-1 space-y-5 relative z-10">
            {/* Vertical Calligraphy Background */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
              <div className="text-[10rem] font-black leading-[0.8] flex flex-col items-center">
                <span>태</span><span>권</span><span>도</span>
              </div>
            </div>

            {[
              { label: "Name", value: formData.fullName },
              { label: "Father's Name", value: extraData.fatherName },
              { label: "Father's Profession", value: extraData.fatherProfession },
              { label: "Date of Birth", value: extraData.dob },
              { label: "Gender", value: extraData.gender },
              { label: "Weight", value: extraData.weight ? `${extraData.weight} Kg` : '', half: true, secondLabel: "Height", secondValue: extraData.height },
              { label: "Nationality", value: extraData.nationality },
              { label: "Qualification", value: extraData.qualification },
              { label: "Address", value: extraData.address, isLong: true },
              { label: "Phone", value: formData.phone },
              { label: "Mobile", value: extraData.mobile || formData.phone }
            ].map((f, i) => (
              <div key={i} className={`flex items-end space-x-2 w-full`}>
                <div className="text-[11px] font-black uppercase whitespace-nowrap mb-1">{f.label}:</div>
                {f.half ? (
                  <div className="flex-1 flex items-end">
                    <div className="flex-1 border-b border-black text-sm font-bold pb-1 px-2 italic min-h-[22px]">{f.value}</div>
                    <div className="text-[11px] font-black uppercase whitespace-nowrap mb-1 ml-4">{f.secondLabel}:</div>
                    <div className="flex-1 border-b border-black text-sm font-bold pb-1 px-2 italic min-h-[22px]">{f.secondValue}</div>
                  </div>
                ) : (
                  <div className={`flex-1 border-b border-black text-sm font-bold pb-1 px-2 italic min-h-[22px] ${f.isLong ? 'min-h-[40px]' : ''}`}>
                    {f.value}
                  </div>
                )}
              </div>
            ))}

            {/* Oath Section */}
            <div className="mt-10 border-2 border-black p-6 bg-white">
              <h3 className="text-lg font-black uppercase underline mb-4 text-center tracking-widest text-black">TAEKWONDO STUDENT OATH</h3>
              <ul className="text-[10px] font-bold space-y-2 uppercase leading-snug text-black">
                <li>* I know what Taekwondo represents, and I will listen and obey my Parents, Teachers, Master and Instructors.</li>
                <li>* I will demonstrate my Taekwondo discipline in the dojang, my school, and most importantly at home.</li>
                <li>* I will only use my Taekwondo ability to defend myself, never in an aggressive manner.</li>
                <li>* I will respect myself, my family, my school and my country.</li>
                <li>* I will always try my best in everything I do, including Taekwondo, School Studies and everything else.</li>
                <li className="italic text-blue-600 pt-2 font-black border-t border-black/5 mt-2">
                  * Children who do not obey their parents CHEERFULLY may be reduced in Rank.
                </li>
              </ul>
            </div>

            <div className="flex justify-between items-end mt-16 mb-8">
              <div className="w-56 text-center">
                <div className="border-t border-black pt-2 text-[10px] font-black uppercase tracking-widest">Parent's Signature</div>
              </div>
              <div className="w-64 text-center">
                <div className="text-[9px] font-bold mb-1 italic opacity-60">Chief Instructor's Signature</div>
                <div className="text-base font-black leading-none uppercase tracking-tight">Basharat Ali Akhonzada</div>
                <div className="text-[8px] font-bold uppercase opacity-40">Black Belt 4th Dan (W.T.F)</div>
                <div className="w-full border-t border-black mt-2"></div>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="border-t-2 border-black pt-6 flex justify-between text-[11px] font-black uppercase">
              <div className="flex items-center space-x-2">
                <span>FEE STRUCTURE: Admission</span>
                <span className="border-b border-black min-w-[60px] text-center italic">1000/-</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Monthly</span>
                <span className="border-b border-black min-w-[60px] text-center italic">5000/-</span>
              </div>
              {/* <div className="flex items-center space-x-2">
                <span>Membership Card</span>
                <span className="border-b border-black min-w-[60px] text-center italic">200/-</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* REGISTRATION PORTAL UI */}
      <div className="w-full bg-[#1C1F23] border-b border-white/10 py-4 px-6 flex justify-between items-center sticky top-0 z-[100] shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
        <div className="flex items-center space-x-2">
          <img src="https://ik.imagekit.io/BakhshuTaekwondo/logo.jpeg?updatedAt=1768482725879" alt="Logo" className="w-8 h-8 bg-white rounded-full" />
          <span className="font-bebas text-lg tracking-widest uppercase text-white">Admission Portal</span>
        </div>
        <div className="w-24"></div>
      </div>

      <div className="w-full max-w-[1000px] p-6 md:p-8 lg:p-12 flex-1 overflow-y-auto">
        {step === 'form' ? (
          <div className="bg-[#1C1F23] p-6 md:p-8 shadow-2xl border-t-[12px] border-white/20 animate-in fade-in slide-in-from-bottom-6 duration-700 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start border-b-2 border-black pb-12 mb-16 relative">
              <div className="flex items-center space-x-6 mb-8 md:mb-0">
                <img
                  src="https://ik.imagekit.io/BakhshuTaekwondo/logo.jpeg?updatedAt=1768482725879"
                  alt="Official Logo"
                  className="w-24 h-24 bg-white rounded-full object-contain"
                />
                <div className="text-left">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.85] mb-2 uppercase">BAKHSHU TAEKWONDO</h1>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tighter leading-none mb-3 uppercase">& FITNESS CLUB</h2>
                  <p className="text-[11px] font-bold uppercase tracking-widest opacity-60">Affiliated with ISLAMABAD TAEKWONDO ASSOCIATION</p>
                  <p className="text-[10px] font-bold uppercase tracking-tighter opacity-40 mt-1">@ bakhshutaekwondoclub | f bakhshutaekwondoclub</p>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end w-full md:w-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div
                  onClick={triggerUpload}
                  className="border-2 border-black w-36 h-48 flex flex-col items-center justify-center text-center relative mb-6 bg-slate-50/50 cursor-pointer group overflow-hidden"
                >
                  <span className="text-[11px] font-black rotate-90 absolute right-[-15px] top-1/2 -translate-y-1/2 whitespace-nowrap uppercase">2 PHOTOGRAPH</span>

                  {passportPhoto ? (
                    <>
                      <img src={passportPhoto} alt="Passport Preview" className="w-full h-full object-cover" />
                      <button
                        onClick={removePhoto}
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 hover:bg-black transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center space-y-2 opacity-10 group-hover:opacity-30 transition-opacity">
                      <Printer size={32} />
                      <Camera size={24} />
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={triggerUpload}
                  className="bg-black text-white px-8 py-3 w-full md:w-auto text-center hover:bg-primary-blue transition-colors active:scale-95 shadow-lg"
                >
                  <span className="text-sm font-black tracking-[0.3em] uppercase">Upload Image</span>
                </button>
              </div>

              <div className="absolute right-0 top-72 hidden xl:block select-none pointer-events-none opacity-[0.03]">
                <span className="text-[12rem] font-black leading-none flex flex-col text-black">
                  <span>태</span>
                  <span>권</span>
                  <span>도</span>
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 relative z-10 font-serif">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                {[
                  { label: "Name", name: "fullName", placeholder: "Applicant's Full Name", required: true },
                  { label: "Father's Name", name: "fatherName", placeholder: "Guardian / Father's Name" },
                  { label: "Father's Profession", name: "fatherProfession", placeholder: "Current Occupation" },
                  { label: "Date of Birth", name: "dob", type: "date" },
                  { label: "Gender", name: "gender", isSelect: true, options: ["Male", "Female", "Other"] },
                  { label: "Weight (Kg)", name: "weight", type: "number", placeholder: "KG" },
                  { label: "Height", name: "height", placeholder: "Feet/Inches" },
                  { label: "Nationality", name: "nationality", placeholder: "Pakistani" },
                  { label: "Qualification", name: "qualification", placeholder: "Last Degree / Grade" },
                  { label: "Mobile Number", name: "phone", placeholder: "03XX-XXXXXXX", required: true },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center text-white/80">
                      {field.label} {field.required && <span className="text-red-600 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      {field.isSelect ? (
                        <select
                          name={field.name}
                          onChange={handleChange}
                          className="w-full border-b border-black/20 py-3 focus:border-black outline-none transition-colors bg-black text-base font-bold appearance-none rounded-none"
                        >
                          <option value="">Select Option</option>
                          {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : (
                        <input
                          type={field.type || "text"}
                          name={field.name}
                          required={field.required}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full border-b border-black/20 py-3 focus:border-black outline-none transition-colors bg-transparent text-base font-bold placeholder:opacity-20 rounded-none"
                        />
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Preferred Branch</label>
                  <select name="branch" value={formData.branch} onChange={handleChange} className="w-full border-b border-black/20 py-3 focus:border-black outline-none bg-black text-base font-bold rounded-none">
                    <option value="soan">Soan Garden (Islamabad)</option>
                    <option value="pindi">Haidri Chowk (Rawalpindi)</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Available Slot</label>
                  <select name="slot" value={formData.slot} onChange={handleChange} className="w-full border-b border-black/20 py-3 focus:border-black outline-none bg-transparent text-base font-bold rounded-none">
                    {BRANCHES[formData.branch].slots.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-2 pt-6">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Postal Address</label>
                <textarea
                  name="address"
                  onChange={handleChange}
                  rows={3}
                  className="w-full border-b border-black/20 py-3 focus:border-black outline-none transition-colors bg-transparent text-base font-bold placeholder:opacity-20 resize-none rounded-none"
                  placeholder="Street, House No, Sector/Block, City"
                ></textarea>
              </div>

              <div className="mt-20 p-10 border-2 border-white/20 bg-[#1C1F23] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                  <img src="https://ik.imagekit.io/BakhshuTaekwondo/bakhshu?updatedAt=1767881121835" className="w-40" alt="Watermark" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-[0.2em] border-b border-white/20 pb-4 mb-8 text-center italic text-white">TAEKWONDO STUDENT OATH</h3>
                <ul className="space-y-4 text-[11px] font-bold leading-relaxed uppercase tracking-wide text-white">
                  <li className="flex items-start"><span className="mr-3 mt-1">•</span> I know what Taekwondo represents, and I will listen and obey my Parents, Teachers, Master and Instructors.</li>
                  <li className="flex items-start"><span className="mr-3 mt-1">•</span> I will demonstrate my Taekwondo discipline in the dojang, my school, and most importantly at home.</li>
                  <li className="flex items-start"><span className="mr-3 mt-1">•</span> I will only use my Taekwondo ability to defend myself, never in an aggressive manner.</li>
                  <li className="flex items-start"><span className="mr-3 mt-1">•</span> I will respect myself, my family, my school and my country.</li>
                  <li className="flex items-start"><span className="mr-3 mt-1">•</span> I will always try my best in everything I do, including Taekwondo, School Studies and everything else.</li>
                  <li className="italic text-primary-blue bg-primary-blue/5 p-4 mt-6 border-l-4 border-primary-blue text-white">
                    * Children who do not obey their parents <span className="font-black underline uppercase italic">CHEERFULLY</span> may be reduced in Rank.
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-20 pt-20 pb-10 border-t border-black/10">
                <div className="flex flex-col items-center">
                  <div className="w-full border-t border-black pt-3 text-center">
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Applicant / Parent's Signature</span>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="italic text-sm font-bold mb-2">Chief Instructor's Signature</div>
                  <div className="font-black text-lg uppercase leading-none tracking-tight">Basharat Ali Akhonzada</div>
                  <div className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1">Black Belt 4th Dan (W.T.F)</div>
                  <div className="w-full border-t border-black mt-3"></div>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] pt-8 opacity-60 border-t border-black/5">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <span>FEE STRUCTURE: Admission</span>
                  <div className="text-sm font-serif italic text-red font-white border-b border-white min-w-[60px] text-center">1500/-</div>
                </div>
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <span>Monthly</span>
                  <div className="text-sm font-serif italic text-red font-white border-b border-white min-w-[60px] text-center">2500/-</div>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <span>Membership Card</span>
                  <div className="text-sm font-serif italic text-white font-black border-b border-black min-w-[60px] text-center">1000/-</div>
                </div> */}
              </div>

              <div className="pt-12">
                <button
                  type="submit"
                  className="w-full bg-black text-white py-8 font-black text-base uppercase tracking-[0.5em] transition-all hover:bg-primary-blue shadow-2xl active:scale-95 flex items-center justify-center space-x-6 group"
                >
                  <span>Register Application</span>
                  <Send size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <p className="text-center mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  By submitting this form, you agree to the academy's terms of service and the Student Oath.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-[#1C1F23] p-12 md:p-20 text-center shadow-2xl border-t-[12px] border-white/20 animate-in zoom-in duration-500 max-w-2xl mx-auto text-white">
            <div className="w-28 h-28 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl">
              <CheckCircle size={64} />
            </div>
            <h2 className="text-6xl font-bebas mb-6 leading-none text-white">Registration Successful</h2>
            <p className="text-slate-500 mb-12 text-xl font-serif italic leading-relaxed">
              Assalam o Alaikum <span className="text-white font-bold">{formData.fullName}</span>! Your admission request for the <span className="text-white font-bold uppercase tracking-widest">{BRANCHES[formData.branch].name}</span> has been digitally filed.
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={downloadFilledForm}
                disabled={isGeneratingPDF}
                className="w-full bg-slate-900 text-white py-6 rounded-none font-black text-sm tracking-[0.3em] flex items-center justify-center space-x-3 active:scale-95 transition-all shadow-xl hover:bg-black disabled:opacity-50"
              >
                {isGeneratingPDF ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                ) : (
                  <Download size={20} />
                )}
                <span>{isGeneratingPDF ? 'Generating Form...' : 'Download Official Form (PDF)'}</span>
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-6 rounded-none font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center space-x-3 active:scale-95 transition-all shadow-xl hover:brightness-110"
              >
                <img src="https://img.icons8.com/color/48/whatsapp--v1.png" className="w-8 h-8" alt="WhatsApp" />
                <span>Confirm on WhatsApp</span>
              </a>

              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                * Note: Please attach the downloaded PDF in the WhatsApp chat for official records.
              </p>

              <button
                onClick={onBack}
                className="w-full border-2 border-black text-white py-5 rounded-none font-black text-sm uppercase tracking-[0.3em] hover:bg-black hover:text-white active:scale-95 transition-all mt-4"
              >
                Return to Main Website
              </button>
            </div>

            <div className="mt-16 pt-10 border-t border-black/5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Application Reference ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto py-10 text-center opacity-20">
        <p className="text-[10px] font-black tracking-[0.5em] uppercase">© 2026 BAKHSHU TAEKWONDO ACADEMY • ISLAMABAD</p>
      </div>
    </div>
  );
};

export default RegistrationPage;
