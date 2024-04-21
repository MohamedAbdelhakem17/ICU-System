import React from 'react'
import icuImg from "../Icu.jpg";


export default function IcuDesc() {
    return (
        <>
            <section id='definition' className="py-3">
                <div className="container">
                    <div className="title"  >
                        <h2 className="special-title" data-aos="zoom-in" data-aos-duration="1000">العناية المركزة</h2>
                        <h3 data-aos="fade-up" data-aos-duration="1150"> ماهى العناية المركزة </h3>
                    </div>
                    <div className="row  justify-content-evenly align-items-stretch pt-3 g-2 ">
                        <div className="col-lg-6 col-md-12" data-aos="fade-left" data-aos-offset="120" data-aos-duration="1000" data-aos-delay="50">
                            <p>
                                الرعاية المركزة هي أقسام متخصصة ومنفصلة قائمة بذاتها مجهزة
                                بالأجهزة والمعدات الطبية اللازمة للمراقبة الدقيقة والتدخل السريع
                                وعلاج المرضى المصابين بأمراض خطيرة أو حالات حرجة تلزم مراقبتها
                                على مدار 24 ساعة.
                            </p>
                            <p>
                                لهدف الرئيسي من وحدة العناية المركزة يكمن في الحفاظ على الوظائف
                                الحيوية للمريض ومنع تدهورها وتقليل الوفيات والحد من الإصابة
                                بأمراض أخرى للمرضى ذوي الحالات الحرجة.
                            </p>
                            <p>
                                ومع تطور وتخصص الطب زادت الحاجة إلى وحدات عناية مركزة متخصصة
                                سواء لمرض معين أو فئة عمرية محددة.
                            </p>
                        </div>
                        <div className="img  col-lg-5 col-md-12">
                            <img src={icuImg} alt="" className="w-100" data-aos="zoom-in" data-aos-offset="120" data-aos-duration="1000" data-aos-delay="50" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
