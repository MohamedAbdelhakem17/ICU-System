-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2024 at 12:38 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `icu`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(9) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(9) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'محمد عبدالحكيم ', 'abdelhakem_17@admin.com', '$2y$10$kuQvCCz3FzVDzRRA0ApXauIjGlXOA5vu7xiCRqFmd7HWMi7OnwnSi', 'admin'),
(2, 'مسعد السعيد', 'admin@admin.com', '$2y$10$zXLZREsS9bKcZwAJXujCwumQmONuv/6NsLxVQrloAAi2ev4xoAHga', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `ads`
--

CREATE TABLE `ads` (
  `id` int(9) UNSIGNED NOT NULL,
  `hosoital_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `info` text NOT NULL,
  `add_by` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ads`
--

INSERT INTO `ads` (`id`, `hosoital_name`, `address`, `info`, `add_by`) VALUES
(9, 'حسبو الدولى ', '6 احمد فخرى المنطقه السادسه مدينة نصر ', 'ترحب مستشفى حسبو من الخبراء في مجال الطب الذين يتمتعون بخبرة واسعة في مجالات متعددة من الطب. نحن نفخر بتوفير خدمات طبية عالية الجودة لجميع مرضانا ومرضى المنطقة.\n\nتتميز مستشفى حسبو الدولى بفريق طبي متخصص ومؤهل تأهيلا عاليا، ومعدات طبية حديثة ومتطورة لتلبية جميع احتياجات المرضى. نحن نسعى جاهدين لتوفير الرعاية الصحية المتكاملة لمجتمعنا.\n\nإذا كنت تبحث عن خدمات طبية ممتازة من الخبراء، فلا تتردد في زيارة مستشفى حسبو الدولي. نحن نضمن لك الحصول على العناية الصحية المثالية التي تستحقها. ', 1),
(10, 'مستشفى النيل بدراوي ', 'اول كورنيش المعادي القاهره  ', '\"تعلن مستشفى النيل بدراوي  عن افتتاح قسم خاص متخصص في حالات الحوادث. يتميز هذا القسم بفريق طبي مؤهل ومدرب على أعلى مستوى لتقديم الرعاية الصحية اللازمة للمصابين بجروح وإصابات جسدية خطيرة.. \n\nتوفر عناية مركزة أحدث التقنيات الطبية والمعدات الحديثة لضمان أفضل النتائج لمرضانا. كما يتوفر لدينا فريق طبي متعدد التخصصات يعمل بشكل متناغم لتشخيص وعلاج الإصابات بأفضل الطرق الممكنة.\n\nنحن نفخر بتوفير الرعاية الصحية العالية الجودة والتي تتميز بالتفاني والإهتمام الشخصي في كل حالة. إذا كنت تبحث عن مركز يقدم خدمات متخصصة لحالات الحوادث، فلا تتردد في زيارة عناية مركزة. نحن هنا لنقدم لك الرعاية التي تستحقها.\"', 1),
(20, 'هليوبوليس', '٣ شارع حامد باشا فهمي مصر الجديده ', 'تعلن عن قدوم وفد طبي اجنبي عالي الكفاءه ويتألف الوفد من ٥ اطباء متخصصين في العنايه المركزه تخصصي الجراحه و عنايه القلب وذلك اعتبارا من ٢١/٥/٢٠٢٣ وحتي ٢١/٦/٢٠٢٣', 1),
(34, 'الحياه', 'شبرا', 'عدد السراير', 2),
(42, 'مارمرقص', 'شبرا مصر', 'قدوم دكاترة حلوة', 2),
(43, 'الهدى ', 'المعادى', 'اضافه خمس سراير جداد فى  قسم الجراحه من المستشفى الهدى', 2);

-- --------------------------------------------------------

--
-- Table structure for table `analysis`
--

CREATE TABLE `analysis` (
  `id` int(9) UNSIGNED NOT NULL,
  `user_id` int(9) UNSIGNED NOT NULL,
  `hospital_id` int(9) UNSIGNED NOT NULL,
  `analysis` varchar(100) NOT NULL,
  `tilte` varchar(100) NOT NULL,
  `add_at` date NOT NULL DEFAULT current_timestamp(),
  `size` int(9) NOT NULL,
  `doctor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `analysis`
--

INSERT INTO `analysis` (`id`, `user_id`, `hospital_id`, `analysis`, `tilte`, `add_at`, `size`, `doctor`) VALUES
(12, 1, 23, '6467a8684d3f8.pdf', ' دم', '2023-05-19', 1519018, 'ديانا'),
(13, 20, 4, '6467b75c254ff.pdf', ' دم', '2023-05-19', 1519018, 'ديانا'),
(15, 23, 30, '64689ff992866.pdf', ' دم', '2023-05-20', 649377, 'نور');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `code` int(9) UNSIGNED NOT NULL,
  `user_id` int(9) UNSIGNED NOT NULL,
  `hospital_id` int(9) UNSIGNED NOT NULL,
  `icu_id` int(9) UNSIGNED NOT NULL,
  `bayment_code` int(9) UNSIGNED NOT NULL,
  `enter_time` date NOT NULL DEFAULT current_timestamp(),
  `exit_time` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`code`, `user_id`, `hospital_id`, `icu_id`, `bayment_code`, `enter_time`, `exit_time`) VALUES
(21, 19, 23, 19, 21, '2023-05-13', '2023-05-19'),
(22, 19, 23, 21, 21, '2023-05-17', '2023-05-17'),
(23, 19, 23, 21, 21, '2023-05-17', '2023-05-18'),
(24, 1, 23, 20, 24, '2023-05-18', NULL),
(25, 19, 26, 24, 21, '2023-05-19', '2023-05-20'),
(26, 19, 23, 19, 21, '2023-05-19', NULL),
(27, 20, 4, 18, 27, '2023-05-19', NULL),
(28, 1, 4, 18, 24, '2023-05-20', NULL),
(30, 23, 30, 30, 30, '2023-05-20', '2023-05-20');

-- --------------------------------------------------------

--
-- Table structure for table `ehr`
--

CREATE TABLE `ehr` (
  `user_id` int(9) UNSIGNED NOT NULL,
  `hospital_id` int(9) UNSIGNED NOT NULL,
  `health_status` text NOT NULL,
  `doctor` varchar(100) NOT NULL,
  `add_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ehr`
--

INSERT INTO `ehr` (`user_id`, `hospital_id`, `health_status`, `doctor`, `add_at`) VALUES
(1, 23, 'مش عارف يتنفس هه', 'ديانا', '2023-05-19'),
(19, 23, 'عيل مذبذب كدا', 'ديانا', '2023-05-17'),
(20, 4, 'تعبانه شويه وكدا', 'ديانا', '2023-05-19'),
(23, 30, 'يدويلولس', 'حازم', '2023-05-20'),
(41, 23, 'جلطه في القلب', 'ديانا حمدي', '2023-06-13');

-- --------------------------------------------------------

--
-- Table structure for table `hospital`
--

CREATE TABLE `hospital` (
  `id` int(9) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `add_by` int(9) UNSIGNED NOT NULL,
  `role` varchar(9) NOT NULL DEFAULT 'hospital'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hospital`
--

INSERT INTO `hospital` (`id`, `name`, `address`, `email`, `password`, `add_by`, `role`) VALUES
(4, 'مستشفى السعودى الالمانى ', 'محور طه حسين، الهايكستب، قسم النزهة، محافظة القاهرة', 'hospital_17@hospital.com', '$2y$10$kuQvCCz3FzVDzRRA0ApXauIjGlXOA5vu7xiCRqFmd7HWMi7OnwnSi', 1, 'hospital'),
(23, 'دار الفؤاد', ' تقاطع طريق النصر مع يوسف عباس، مدينة نصر،, محافظة القاهرة‬', 'hospital@hospital.com', '$2y$10$zAk.BNT4Yfls/V2GKphwgegpNveg8fkRHeMV4Rmhp9XNrrdlAsEiG', 1, 'hospital'),
(25, 'مصر الطيران', ' ش ابو بكر الصديق - الماظة بجوار مطار الماظة', 'masr@masr.com', '$2y$10$WsmKLH/bP2RYq49du2Q/weYwcv0NAZUtI29gVfW67zDVQxAidqjem', 1, 'hospital'),
(26, 'هليوبوليس', '٣شارع حامد باشا فهمي مصر الجديده', 'heliopolis@hospital.com', '$2y$10$6Wi548hKLkYgu3M9Icr1t.L3mm2FM10SSIrswsjHGcUx/AQ98kXyi', 1, 'hospital'),
(27, 'النزهه الدولي', '9 ش الرشيد متفرع من شارع المشير احمد اسماعيل مصر الجديدة', 'nozha@hospital.com', '$2y$10$/wWRPYOPi2rlzqOKsjq3AOG1Yj7myZtBgLBCbgHpB7ur9iXviLyJ2', 1, 'hospital'),
(30, 'الدمرداش', '56 ش رمسيس, خلف مسجد النور, عباسية, القاهرة', 'hospital_1@hospital.com', '$2y$10$IawEW0Fu.wOGGVOjLPrDUeN4lFoFx74XnzMOjA9D63y38/tkWQxWi', 1, 'hospital');

-- --------------------------------------------------------

--
-- Table structure for table `icu`
--

CREATE TABLE `icu` (
  `icu_code` int(9) UNSIGNED NOT NULL,
  `number_of_beds` int(15) UNSIGNED NOT NULL,
  `specialization` varchar(20) NOT NULL,
  `hospital_id` int(9) UNSIGNED NOT NULL,
  `img_name` varchar(100) NOT NULL,
  `info` text NOT NULL,
  `price` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `icu`
--

INSERT INTO `icu` (`icu_code`, `number_of_beds`, `specialization`, `hospital_id`, `img_name`, `info`, `price`) VALUES
(18, 2, 'قلب', 4, '645f7088e74ae.jpg|645f7088e756d.jpg|645f7088e75fa.jpg|645f7088e7686.jpg', 'تختلف تجهيزات وأجهزة العناية المركزة المستخدمة في حالات الحروق باختلاف درجة الحروق وحالة المريض. ومن بين الأجهزة الشائعة التي تستخدم في عناية المركزة لتخفيف آلام الحروق وتعزيز التئامها، يمكن ذكر:\r\n\r\n1- أجهزة التنفس الصناعي: تستخدم لمساعدة المريض على التنفس في حالات الحروق الشديدة التي تؤثر على الجهاز التنفسي.\r\n\r\n2- أجهزة قياس ورصد الضغط الدموي ونسبة الأكسجين في الدم: تستخدم لمراقبة حالة المريض والتأكد من استقرار حالته الصحية.\r\n\r\n3- أجهزة حقن الأدوية: تستخدم لإعطاء المريض الأدوية اللازمة لتخفيف الألم والتخفيف من التورم والتهاب الجلد.\r\n', 4000),
(19, 0, 'قلب ', 23, '645f752c5175b.jpg|645f752c51817.jpg|645f752c518a9.jpg|645f752c51938.jpg', 'تختلف تجهيزات وأجهزة العناية المركزة المستخدمة في حالات الحروق باختلاف درجة الحروق وحالة المريض. ومن بين الأجهزة الشائعة التي تستخدم في عناية المركزة لتخفيف آلام الحروق وتعزيز التئامها، يمكن ذكر:\r\n\r\n1- أجهزة التنفس الصناعي: تستخدم لمساعدة المريض على التنفس في حالات الحروق الشديدة التي تؤثر على الجهاز التنفسي.\r\n\r\n2- أجهزة قياس ورصد الضغط الدموي ونسبة الأكسجين في الدم: تستخدم لمراقبة حالة المريض والتأكد من استقرار حالته الصحية.\r\n\r\n3- أجهزة حقن الأدوية: تستخدم لإعطاء المريض الأدوية اللازمة لتخفيف الألم والتخفيف من التورم والتهاب الجلد.', 3000),
(20, 2, 'مخ واعصاب ', 23, '645f75696e788.jpg|645f75696e82e.jpg|645f75696e89b.jpg|645f75696e904.jpg', 'تختلف تجهيزات وأجهزة العناية المركزة المستخدمة في حالات الحروق باختلاف درجة الحروق وحالة المريض. ومن بين الأجهزة الشائعة التي تستخدم في عناية المركزة لتخفيف آلام الحروق وتعزيز التئامها، يمكن ذكر:\r\n\r\n1- أجهزة التنفس الصناعي: تستخدم لمساعدة المريض على التنفس في حالات الحروق الشديدة التي تؤثر على الجهاز التنفسي.\r\n\r\n2- أجهزة قياس ورصد الضغط الدموي ونسبة الأكسجين في الدم: تستخدم لمراقبة حالة المريض والتأكد من استقرار حالته الصحية.\r\n\r\n3- أجهزة حقن الأدوية: تستخدم لإعطاء المريض الأدوية اللازمة لتخفيف الألم والتخفيف من التورم والتهاب الجلد.', 3000),
(21, 2, 'حروق', 23, '645f75696e788.jpg|645f75696e82e.jpg|645f75696e89b.jpg|645f75696e904.jpg', 'ممتازه جدا للحروق ', 7000),
(22, 6, 'مخ واعصاب', 25, '646602d58ba0d.jpeg|646602d58baf7.jpeg|646602d58bbb3.jpeg|646602d58bc55.jpeg', 'تتوفر في عناية المخ والأعصاب العديد من الأجهزة المتطورة التي تستخدم في تشخيص وعلاج الاضطرابات والأمراض العصبية والدماغية، ومن أهم هذه الأجهزة:\r\n\r\n1- جهاز التصوير بالرنين المغناطيسي MRI: يستخدم لإنتاج صور ثلاثية الأبعاد للدماغ والأعصاب والحبل الشوكي باستخدام المجالات المغناطيسية والأمواج الراديوية.\r\n\r\n2- جهاز التصوير المقطعي بالإنبعاث الإيجابي PET: يستخدم لإنتاج صور ثلاثية الأبعاد للدماغ والأعصاب والحبل الشوكي باستخدام إشعاعات الإيجابيات المشعة.\r\n\r\n3- جهاز التصوير بالموجات فوق الصوتية: يستخدم للكشف عن الجلطات الدماغية وتقدير حجم الورم العصبي وتحديد مسار الأعصاب المحيطية.\r\n\r\n4- جهاز القياس الوظيفي للدماغ: يستخدم لتقييم وظيفة الدماغ وقدرته على الإجابة على المحفزات المختلفة، ويستخدم عادة في دراسة الأمراض النفسية مثل الاكتئاب والقلق.\r\n\r\n5- جهاز العلاج بالتحفيز العصبي العميق: يستخدم لعلاج الأمراض العصبية المزمنة مثل مرض باركنسون، ويعمل عن طريق توصيل أسلاك رفيعة إلى مناطق محددة في الدماغ وتطبيق تيار كهربائي لتحفيز هذه المناطق.\r\n\r\n6- جهاز الاستيقاظ الكهربائي: يستخدم لتشخيص اضطرابات النوم وتحديد مدى تأثيرها على صحة الدماغ والوظائف العصبية.', 5000),
(23, 6, 'جراحه', 26, '64677e0dceae5.jpeg|64677e0dceba3.jpeg', 'تستخدم الأجهزة في العديد من جوانب الرعاية الصحية، بما في ذلك الجراحة. تعتبر الأجهزة الجراحية أدوات أساسية في الجراحة التي تهدف إلى تحسين صحة المريض وإنقاذ حياته.\r\nتشمل الأدوات الجراحية المستخدمة في العناية بالجراحة مجموعة متنوعة من الأجهزة، بما في ذلك:\r\n\r\n1. المناظير الجراحية: وهي أدوات تستخدم للتحكم في الأدوات الجراحية داخل الجسم، مما يسمح للجراح بالتحكم في الجراحة بدقة أكبر وتقليل الأضرار للأنسجة السليمة.\r\n\r\n2. مضخات الأوكسجين: وهي أجهزة تستخدم لضخ الأوكسجين في جسم المريض خلال الجراحة. تعمل هذه الأجهزة على تحسين مستويات الأوكسجين في الدم والتأكد من أن الأنسجة تحصل على الكمية الكافية من الأوكسجين للحفاظ على وظائفها الحيوية.\r\n\r\n3. أجهزة الشفط: وهي أدوات تستخدم لسحب السوائل والأنسجة الميتة والدماء خلال الجراحة. تساعد هذه الأجهزة في الحد من الخطر المتعلق بالنزيف وتحسين رؤية الجراح.\r\n\r\n4. أجهزة المونيتور: وهي أدوات تستخدم لرصد علامات حيوية المريض خلال الجراحة، مثل مستوى القلب وضغط الدم ومعدل التنفس ومستويات الأوكسجين في الدم. يتم استخدام هذه الأجهزة لمراقبة صحة المريض والتأكد من أن جميع العمليات الحيوية تسير بشكل طبيعي.\r\n\r\n5. أجهزة الليزر: وهي أدوات تستخدم لإزالة الأنسجة الضارة أو الخبيثة من الجسم. تستخدم في العمليات الجراحية الدقيقة والتي تتطلب دقة عالية في إزالة الأنسجة، مما يساعد على تقليل الأضرار للأنسجة السليمة.\r\n\r\n6. أجهزة التنظير: وهي أدوات تستخدم لفحص الأنسجة والأعضاء داخل الجسم. تعمل هذه الأجهزة على تحسين دقة التشخيص وتحديد مصدر المشكلة بدقة أكبر، وبالتالي تساعد في تجنب الجراحة اللازمة في بعض الحالات.\r\n\r\n7. أجهزة التخدير: وهي أدوات تستخدم لتخدير المريض خلال الجراحة. تساعد هذه الأجهزة في تخفيف الألم والتقليل من التوتر النفسي للمريض أثناء الجراحة.\r\n\r\n8. أجهزة الأشعة: وهي أدوات تستخدم للكشف عن الأمراض والإصابات داخل الجسم، وتساعد في تحديد موقع الجراحة وتحديد نطاقها بدقة.', 4500),
(24, 6, 'قلب', 26, '64677eb52bd08.jpg|64677eb52bdb8.jpg|64677eb52be22.jpg|64677eb52be80.jpg', 'تعتبر الأجهزة الطبية أساسية في رعاية القلب، حيث تساعد على تشخيص وعلاج الأمراض القلبية، وتحسين صحة المرضى المصابين بها. يمكن استخدام العديد من الأجهزة في عناية القلب، ومن بينها:\r\n1. أجهزة القياس الحيوي: وهي أجهزة تستخدم لقياس عدد من المؤشرات الحيوية، مثل ضغط الدم، ومعدل ضربات القلب، ومستوى الأوكسجين في الدم. تساعد هذه الأجهزة في تقييم صحة القلب وتحديد العلاج اللازم.\r\n\r\n2. أجهزة التصوير: وتشمل الأشعة السينية والصوتية والرنين المغناطيسيوالتصوير المقطعي، وتستخدم لتشخيص الأمراض القلبية وتحديد موقعها وشدتها. تعمل هذه الأجهزة على إنشاء صور دقيقة للقلب وأجزائه، وتساعد في تحديد نوع العلاج اللازم للمريض.\r\n\r\n3. أجهزة التخدير: وهي أدوات تستخدم لتخدير المريض أثناء الجراحة القلبية، وتساعد في تخفيف الألم والتقليل من التوتر النفسي للمريض خلال العملية.\r\n\r\n4. أجهزة القسطرة: وهي أجهزة تستخدم في إجراء عمليات القسطرة القلبية، وتساعد في تشخيص وعلاج الأمراض القلبية، مثل تضييق الشرايين التاجية والانسدادات الأخرى. تعمل هذه الأجهزة على إدخال أنابيب رفيعة من خلال الشرايين والأوردة إلى القلب، ويتم استخدامها لإجراء عمليات القسطرة والتدخل الجراحي اللازم.\r\n\r\n5. أجهزة المساعدة للقلب: وتشمل المحفزات القلبية وأجهزة دعم القلب، وتستخدم لمرضى القلب الذين يعانون من عدم قدرة القلب على القيام بوظيفته بشكل كافٍ. تعمل هذه الأجهزة على تحسين وظائف القلب وتخفيف الأعراض، وتستخدم في العديد من الحالات، مثل القصور القلبي والتوسع الشديد للشرايين التاجية والأمراض الوراثية المرتبطة بالقلب.\r\n\r\n6. أجهزة الرصد المستمر: وتشمل أجهزة المراقبة القلبية المحمولة والأجهزة القابلة للارتداء، وتستخدم لرصد صحة القلب ومراقبة مؤشرات اللياقة البدنية والأنشطة اليومية. يمكن استخدام هذه الأجهزة لمتابعة المرضى المصابين بأمراض القلب المزمنة، وتساعد في تحديد الأنشطة التي يمكن للمريض القيام بها والتي يجب تجنبها.', 5000),
(25, 3, 'حروق', 27, '64677f589e87b.jpg|64677f589e912.jpg|64677f589e980.jpg', 'تعتبر الحروق من الإصابات الجلدية الشائعة التي تتطلب رعاية خاصة لتحسين الشفاء وتجنب المضاعفات. يمكن استخدام الأجهزة في عناية الحروق لتحسين العلاج وتقليل الألم والتورم والتهيج، ومن بين الأجهزة التي يمكن استخدامها في عناية الحروق:\r\n1. أجهزة التبريد: وتستخدم لتقليل الألم والتورم والتهيج في المنطقة المصابة. تعمل هذه الأجهزة على تخفيف الألم عن طريق تقليل درجة الحرارة المحيطة بالجلد المصابة، وتساعد في تقليل التورم والتهيج عن طريق تقليل تدفق الدم إلى المنطقة المصابة.\r\n\r\n2. أجهزة الترطيب: وتستخدم لترطيب الجلد المصاب وتقليل الجفاف والتشققات، وتساعد في تسريع عملية الشفاء. يمكن استخدام الأجهزة الترطيبية في شكل كريمات أو لوشنات خاصة بعناية الحروق، ويمكن أيضا استخدامها في شكل أجهزة ميكانيكية تقوم بترطيب الجلد بشكل مستمر.\r\n\r\n3. أجهزة التحليل الحيوي: وتستخدم لتحليل العينات الحيوية المأخوذة من الجلد المصاب، وتساعد في تحديد نوع الجرثومة أو الفيروس المسبب للحروق، وبالتالي تحديد نوع العلاج المناسب. تشمل هذه الأجهزة جهاز تحليل الدم والأنسجة وجهاز تحليل البكتيريا والفيروسات.\r\n\r\n4. أجهزة التخدير: وهي أدوات تستخدم لتخدير المريض أثناء إجراء عمليات الحروق والعلاج اللازم. تساعد هذه الأجهزة في تخفيف الألم وتقليل التوتر النفسي للمريض خلال العلاج.\r\n\r\n5. أجهزة الليزر: وتستخدم لتحسين عملية الشفاء وتقليل ندبات الحروق. يتم استخدام الليزر لتحفيز نمو الخلايا السليمة في الجلد وتحسين مرونته، وبالتالي تقليل حجم الندبات وتحسين مظهر الجلد المصاب.\r\n\r\n6. أجهزةالتدفئة: وتستخدم لتحسين الدورة الدموية في منطقة الحروق وتحسين عملية الشفاء. تعمل هذه الأجهزة على زيادة تدفق الدم إلى المنطقة المصابة، وبالتالي زيادة تدفق الأكسجين والمواد الغذائية ', 3500),
(26, 3, 'مخ واعصاب', 27, '64677fd14a1af.jpeg|64677fd14a24f.jpeg|64677fd14a2b5.jpeg|64677fd14a314.jpeg', 'تعد الأجهزة الطبية أساسية في رعاية المخ والأعصاب، حيث تساعد على تشخيص وعلاج الأمراض العصبية والمخية، وتحسين صحة المرضى المصابين بها. يمكن استخدام العديد من الأجهزة في عناية المخ والأعصاب، ومن بينها:\r\n1. أجهزة التصوير: وتشمل الرنين المغناطيسي والتصوير الشعاعي والتصوير المقطعي، وتستخدم لتشخيص الأمراض العصبية والمخية وتحديد موقعها وشدتها. تعمل هذه الأجهزة على إنشاء صور دقيقة للمخ والأعصاب، وتساعد في تحديد نوع العلاج اللازم.\r\n\r\n2. أجهزة العلاج الكهربائي: وتستخدم لتشخيص وعلاج الأمراض العصبية، مثل الشلل النصفي والتصلب اللويحي والصرع والألم العصبي. تعمل هذه الأجهزة على تحفيز الأعصاب وتسجيل الإشارات الكهربائية المنبعثة منها، وبالتالي تحديد موقع الأعصاب المصابة وتحسين وظيفتها.\r\n\r\n3. أجهزة العلاج بالليزر: وتستخدم لعلاج الأمراض العصبية والمخية، مثل الصداع والتهاب الأعصاب والتشنجات العضلية. تعمل هذه الأجهزة على تحفيز الخلايا وتحسين دورتها الدموية، وبالتالي تحسين وظيفة الأعصاب والأنسجة المصابة.\r\n\r\n4. أجهزة العلاج الحراري: وتستخدم لتخفيف الألم وتحسين الدورة الدموية وتسريع عملية الشفاء في الأمراض العصبية والمخية، مثل الشلل النصفي والتصلب اللويحي والتهاب الأعصاب. تعمل هذه الأجهزة على زيادة تدفق الدم إلى المنطقة المصابة وتحسين نمو الخلايا الجديدة.\r\n\r\n5. أجهزة العلاج بالتنفس الصناعي: وتستخدم لمساعدة المرضى الذين يعانون من صعوبة في التنفس بسبب أمراض الأعصاب والمخ. تعمل هذه الأجهزة على توفير الأكسجين اللازم وتحسين التهوية الرئوية وتخفيف الضغط على الجهاز التنفسي.\r\n\r\n6. أجهزة العلاج بالتحفيز العصبي العميق: وتستخدم لعلاج الأمراض العصبية والمخية، مثل مرض باركنسون والصرع والاكتئاب والألم العصبي. تعمل هذه الأجهزة على تحفيز الأعصاب في مناطق معينة من الدماغ والجهاز العصبي المركزي، وبالتالي تحسين وظيفتها وتخفيف الأعراض.', 4000),
(30, 1, 'عناية قلب ', 30, '64689f5dd4dc9.jpg|64689f5dd4e9a.jpg|64689f5dd4f26.jpg|64689f5dd4faa.jpg', 'تختلف تجهيزات وأجهزة العناية المركزة المستخدمة في حالات الحروق باختلاف درجة الحروق وحالة المريض. ومن بين الأجهزة الشائعة التي تستخدم في عناية المركزة لتخفيف آلام الحروق وتعزيز التئامها، يمكن ذكر:\r\n\r\n1- أجهزة التنفس الصناعي: تستخدم لمساعدة المريض على التنفس في حالات الحروق الشديدة التي تؤثر على الجهاز التنفسي.\r\n\r\n2- أجهزة قياس ورصد الضغط الدموي ونسبة الأكسجين في الدم: تستخدم لمراقبة حالة المريض والتأكد من استقرار حالته الصحية.\r\n\r\n3- أجهزة حقن الأدوية: تستخدم لإعطاء المريض الأدوية اللازمة لتخفيف الألم والتخفيف من التورم والتهاب الجلد.', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `icu_rate`
--

CREATE TABLE `icu_rate` (
  `id` int(9) UNSIGNED NOT NULL,
  `user_id` int(9) UNSIGNED NOT NULL,
  `icu_id` int(9) UNSIGNED NOT NULL,
  `comment` varchar(255) NOT NULL,
  `rate` int(1) NOT NULL DEFAULT 1,
  `add_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `icu_rate`
--

INSERT INTO `icu_rate` (`id`, `user_id`, `icu_id`, `comment`, `rate`, `add_at`) VALUES
(71, 1, 18, ' جيده  ', 0, '2023-05-13 11:12:58'),
(72, 19, 21, ' معامله زفت ', 1, '2023-05-17 23:56:19'),
(73, 1, 19, ' ممتازه  ', 4, '2023-05-18 09:14:45'),
(74, 1, 18, ' حلوة ', 4, '2023-05-18 09:52:31'),
(75, 1, 20, ' ممتازه  ', 5, '2023-05-18 09:53:17'),
(76, 1, 19, ' فلة  ', 4, '2023-05-18 10:39:50'),
(77, 1, 20, ' سيئة ', 1, '2023-05-18 12:26:08'),
(78, 19, 19, ' زي الفل هه ', 0, '2023-05-18 12:27:54'),
(79, 19, 19, ' زي الفل هه ونجمه ', 5, '2023-05-18 12:28:06'),
(80, 19, 22, ' جيده ', 4, '2023-05-18 18:21:45'),
(81, 19, 24, ' عشره ع عشره ونجمه ', 5, '2023-05-19 16:40:37'),
(82, 23, 30, ' جيده ', 5, '2023-05-20 10:24:08'),
(97, 1, 18, ' بيبيبر ', 4, '2023-06-17 18:38:54');

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `id` int(9) UNSIGNED NOT NULL,
  `user_id` int(9) UNSIGNED NOT NULL,
  `hospital_id` int(9) UNSIGNED NOT NULL,
  `medicine` varchar(255) NOT NULL,
  `add_at` date DEFAULT current_timestamp(),
  `size` int(15) NOT NULL,
  `doctor` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`id`, `user_id`, `hospital_id`, `medicine`, `add_at`, `size`, `doctor`, `title`) VALUES
(16, 19, 23, '64655ac62fcab.pdf', '2023-05-17', 1519018, 'دنيا', ' كتفلام'),
(17, 1, 23, '6467a87ddc6d2.pdf', '2023-05-19', 1519018, 'ديانا', ' كتفلام'),
(18, 20, 4, '6467b773ebf76.pdf', '2023-05-19', 1519018, 'ديانا', ' كتفلام وبنادول اكسترا'),
(20, 23, 30, '6468a012234ee.pdf', '2023-05-20', 649377, 'ياسر', ' برشام'),
(25, 41, 23, '6488afc7c58f7.pdf', '2023-06-13', 722828, 'منه الله عبدالله', ' كتفلام');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `code` int(9) UNSIGNED NOT NULL,
  `pay_way` varchar(10) NOT NULL,
  `price` varchar(15) NOT NULL,
  `pay_by` int(9) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`code`, `pay_way`, `price`, `pay_by`) VALUES
(21, 'cash', '3000', 19),
(22, 'visa', '7000', 19),
(23, 'visa', '7000', 19),
(24, 'cash', '3000', 1),
(25, 'cash', '5000', 19),
(26, 'cash', '3000', 19),
(27, 'cash', '4000', 20),
(28, 'cash', '4000', 1),
(30, 'cash', '3000', 23),
(34, 'cash', '3000', 27),
(37, 'cash', '4400', 30),
(44, 'cash', '3000', 39),
(45, 'cash', '3000', 40),
(46, 'cash', '3000', 41),
(52, 'cash', '4400', 50),
(53, 'cash', '2000', 1),
(54, 'cash', '2000', 52);

-- --------------------------------------------------------

--
-- Table structure for table `rays`
--

CREATE TABLE `rays` (
  `id` int(9) UNSIGNED NOT NULL,
  `user_id` int(9) UNSIGNED NOT NULL,
  `hospital_id` int(9) UNSIGNED NOT NULL,
  `rays` varchar(100) NOT NULL,
  `tilte` varchar(100) NOT NULL,
  `add_at` date NOT NULL DEFAULT current_timestamp(),
  `size` int(9) NOT NULL,
  `doctor` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rays`
--

INSERT INTO `rays` (`id`, `user_id`, `hospital_id`, `rays`, `tilte`, `add_at`, `size`, `doctor`) VALUES
(27, 19, 23, '64655aa99ae01.pdf', ' رنين', '2023-05-17', 4827109, 'دنيا'),
(28, 1, 23, '6467a850eaf1e.pdf', ' رنين', '2023-05-19', 1519018, 'دنيا'),
(29, 20, 4, '6467b7486dfd9.pdf', ' رنين', '2023-05-19', 1519018, 'ديانا'),
(30, 20, 4, '646896f0bc499.pdf', ' قلب', '2023-05-20', 3419147, 'محمد أحمد '),
(32, 23, 30, '64689fe4b9839.pdf', ' قلب', '2023-05-20', 649377, 'ياسر'),
(41, 41, 23, '6488af4fa7db4.pdf', ' رنين', '2023-06-13', 1119092, 'ديانا حمدي');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(9) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `role` varchar(9) NOT NULL DEFAULT 'user',
  `age` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `address`, `email`, `password`, `phone`, `role`, `age`) VALUES
(1, 'محمد سعيد', '36 شارع حامد زيدان مدينة النور المطريه القاهرة', 'mohamed_17@user.com', '$2y$10$kuQvCCz3FzVDzRRA0ApXauIjGlXOA5vu7xiCRqFmd7HWMi7OnwnSi', '01151680386', 'user', 40),
(3, 'سمير أبو النيل', 'المطريه ', 'samer_17@user.com', '$2y$10$w/GJEiDuuzGpcxCfHhJrCOqfB83p/qPJ1eVQ0V4GAL2sVGg./N4Cq', '01545277389', 'user', 22),
(4, 'دنيا حمدى ', '16 شارع شبرا مصر', 'doniahamdy905@gmail.com', '$2y$10$Q9kt98yFw3lnxXnNelfFqezbtvH5qCXMI.j.EFu44jwYWSdK5KXse', '01140291057', 'user', 22),
(15, 'عمر احمد', '١٦ شارع مدرسه المماليك ', 'omar_12@gmail.com', '$2y$10$s7evL6MxJ0XdB1a44bGIzO3OD0Sj1yBTUmZt3JzYVKE/v10uSXXjq', '01200884455', 'user', 25),
(16, 'عبدالرحمن حمدي محمد', '١٦ش مدرسة المماليك بالخلفاوي شبرا مصر', 'abdomano99.am@gmail.com', '$2y$10$N0vcx/d4.13i5VGNqpfmuOJxTvRHnwaosuFG5Qrcw0zKGBXUX4WKi', '01210504028', 'user', 24),
(19, 'Mohamed', 'Hulwan ', 'user@user.com', '$2y$10$xT2tzlLC84MBrLoItoZbFeVdNlEZC6B7aajNSoPv4XOIPPwSfzgTa', '01032331858', 'user', 22),
(20, 'Salwa', 'Ahmed', 'salwa@user.com', '$2y$10$ieymPOv/GP9c9czAb1t3KOmcBvasbX5MhyvlmbRwpZ7SdKOhy2uLS', '01110001155', 'user', 40),
(21, 'Donia', '١٦ شارع مدرسه المماليك', 'donia12@user.com', '$2y$10$A8Bc2tcZAVm8vIG04lM7IuIMK.iF6GfmdmQ4aIMPt3j6MfFa4fRqS', '01122001145', 'user', 22),
(23, 'Donia mohamed', '16 shoubra', 'user_1@user.com', '$2y$10$uAuHRFxZiOxuq6ZpB8yOoO7ztvQopSKOMIaRgcKRzX33ZZaDnV7Ha', '01140291048', 'user', 22),
(27, 'منه', 'القاهره ', 'h@user.com', '$2y$10$Do5jlRepH35/7XO7OaBkSujCOx.0K1oa/2Z2itXuxXQjJVjsCJpme', '01272093304', 'user', 23),
(30, 'مريم محمد', 'مصر الجديده', 'mariam@user.com', '$2y$10$t5ZSGULi..KVY2/oMNG/q.jpPtK/KRujm.JLOA/1bHRvTbYyTJDka', '01000213344', 'user', 21),
(39, 'احمد محمد', 'ديرب نجم الشرقيه ', 'user22@user.com', '$2y$10$yXZP/oaODkzbbr70A5aTvOh9eYrn5vFERXuTEmWt7nBlC27ehIw9O', '01125636937', 'user', 17),
(40, 'Mohamed', 'Hulwan ', 'user2@user.com', '$2y$10$Jbwyp7GN.ABjgLk2TsAYJuVhjEHurrbiSQvUq7HKberFnTbhWEuu6', '01032331858', 'user', 22),
(41, 'دنيا محمد', 'شبرا مصر الخلفاوي', 'user20@user.com', '$2y$10$iUzcKVhECtfrvXdgD97N6O7QoI1VZ81Tb94DahTmX3B1FoTurujNC', '01140291057', 'user', 22),
(50, 'حياه', 'القاهره', 'user8@user.com', '$2y$10$kxrKJ7vA/pSTYWbWx7X0Se28CWWgL.uL/MyDd8srr9/82B11nGuu6', '01234567891', 'user', 23),
(51, 'دنيا مرزوق', 'الخلفاوي ', 'useer10@user.com', '$2y$10$ayZiAh.JJvCGOo9ogiY84.yPiWsGsldvHTCmWSQYh7sIU/WlsAHGi', '01140291057', 'user', 22),
(52, 'منه الله عبدالله', 'شرابيه', 'user11@user.com', '$2y$10$oRTOnNKQl711m8zs1d3lAOnZhF1Fu9xHBjbChmU8IFAvbDRTHxmv2', '01140291057', 'user', 23),
(53, 'محمود', 'االصف', 'user111@user.com', '$2y$10$AaZ7/o0GFg3FybllbSHxfuJ.yXskRuh32B1GT2OK9BAEDCl2KfTzG', '01032331858', 'user', 22);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `ads`
--
ALTER TABLE `ads`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `add_ads` (`add_by`);

--
-- Indexes for table `analysis`
--
ALTER TABLE `analysis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hospital_analysis` (`hospital_id`),
  ADD KEY `user_analysis` (`user_id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`code`),
  ADD KEY `user_book_idx` (`user_id`),
  ADD KEY `hospital_book_in_idx` (`hospital_id`),
  ADD KEY `bayment_cood_idx` (`bayment_code`),
  ADD KEY `icu_booked` (`icu_id`);

--
-- Indexes for table `ehr`
--
ALTER TABLE `ehr`
  ADD PRIMARY KEY (`user_id`,`hospital_id`),
  ADD KEY `hospital_id_idx` (`hospital_id`);

--
-- Indexes for table `hospital`
--
ALTER TABLE `hospital`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `add_hosoital_idx` (`add_by`);

--
-- Indexes for table `icu`
--
ALTER TABLE `icu`
  ADD PRIMARY KEY (`icu_code`),
  ADD KEY `in_hospital_idx` (`hospital_id`);

--
-- Indexes for table `icu_rate`
--
ALTER TABLE `icu_rate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rate_by` (`user_id`),
  ADD KEY `icu_rated` (`icu_id`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hospital_medicine` (`hospital_id`),
  ADD KEY `user_medicine` (`user_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`code`),
  ADD KEY `pay` (`pay_by`);

--
-- Indexes for table `rays`
--
ALTER TABLE `rays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hospital_rays` (`hospital_id`),
  ADD KEY `user_rays` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ads`
--
ALTER TABLE `ads`
  MODIFY `id` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `analysis`
--
ALTER TABLE `analysis`
  MODIFY `id` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `code` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `hospital`
--
ALTER TABLE `hospital`
  MODIFY `id` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `icu`
--
ALTER TABLE `icu`
  MODIFY `icu_code` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `icu_rate`
--
ALTER TABLE `icu_rate`
  MODIFY `id` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `id` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `code` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `rays`
--
ALTER TABLE `rays`
  MODIFY `id` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ads`
--
ALTER TABLE `ads`
  ADD CONSTRAINT `add_ads` FOREIGN KEY (`add_by`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `analysis`
--
ALTER TABLE `analysis`
  ADD CONSTRAINT `hospital_analysis` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_analysis` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `bayment_cood` FOREIGN KEY (`bayment_code`) REFERENCES `payment` (`code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hospital_book_in` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `icu_booked` FOREIGN KEY (`icu_id`) REFERENCES `icu` (`icu_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_book` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ehr`
--
ALTER TABLE `ehr`
  ADD CONSTRAINT `hospital_ehr` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ehr` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hospital`
--
ALTER TABLE `hospital`
  ADD CONSTRAINT `add_hosoital` FOREIGN KEY (`add_by`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `icu`
--
ALTER TABLE `icu`
  ADD CONSTRAINT `in_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `icu_rate`
--
ALTER TABLE `icu_rate`
  ADD CONSTRAINT `icu_rated` FOREIGN KEY (`icu_id`) REFERENCES `icu` (`icu_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rate_by` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `hospital_medicine` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_medicine` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `pay` FOREIGN KEY (`pay_by`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rays`
--
ALTER TABLE `rays`
  ADD CONSTRAINT `hospital_rays` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_rays` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
