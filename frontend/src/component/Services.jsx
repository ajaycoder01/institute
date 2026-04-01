import {
  Briefcase,
  UserCheck,
  FileText,
  Laptop,
  HelpCircle,
  Award,
  Clock,
  Users
} from "lucide-react";

export default function Services() {

  const services = [
    {
      icon: <Briefcase size={30} />,
      title: "Placement Assistance",
      desc: "Dedicated placement support with resume building, mock interviews and job referrals."
    },
    {
      icon: <UserCheck size={30} />,
      title: "Career Guidance",
      desc: "Expert mentors help students choose the right career path in the IT industry."
    },
    {
      icon: <Laptop size={30} />,
      title: "Live Project Training",
      desc: "Work on real-world industry projects to gain practical development experience."
    },
    {
      icon: <FileText size={30} />,
      title: "Interview Preparation",
      desc: "Technical interview training, aptitude practice and HR interview guidance."
    },
    {
      icon: <HelpCircle size={30} />,
      title: "Lifetime Doubt Support",
      desc: "Students can ask doubts anytime and get support from experienced trainers."
    },
    {
      icon: <Award size={30} />,
      title: "Industry Certification",
      desc: "Receive recognized certificates that strengthen your professional profile."
    },
    {
      icon: <Clock size={30} />,
      title: "Flexible Batch Timings",
      desc: "Morning, evening and weekend batches available for students and working professionals."
    },
    {
      icon: <Users size={30} />,
      title: "Small Batch Size",
      desc: "Limited students per batch to ensure personalized attention and better learning."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl  font-bold text-gray-900 uppercase">
            Why Students Choose Our Institute
          </h2>
          <div className="w-30 h-1 bg-red-900 mx-auto mt-3"></div>

         <p className="text-gray-600 font-semibold text-sm sm:text-base md:text-lg lg:text-lg mt-4 md:mt-6 max-w-3xl mx-auto leading-relaxed">
  Our institute focuses on practical learning, career development, and complete support so students can confidently start their professional journey in the IT industry.
</p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 group border border-gray-100 text-center"
            >

              <div className="text-blue-700 mb-4 group-hover:scale-110 transition flex justify-center">
                {service.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {service.title}
              </h3>

              <p className="text-gray-600 text-sm mt-3">
                {service.desc}
              </p>

            </div>
          ))}

        </div>
    

      </div>

    </section>
  );
}