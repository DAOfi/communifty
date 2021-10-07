
var palettes=[];
let w;
var onions=[];
var blobs=[];
var voids=[];
var oblobs=[];

function setup(){
	createCanvas(2400,2400);

	for(let i=0;i<10;i++){
		palettes[i]=[];
	}
	w=int(random(100));


	palettes[0]=[color('#000000'),color('#FFFFFF'),color('#EE3733'),color('#F99A22'),color('#FFD72D'),color('#F6C8DD'),color('#9A4298'),color('#D64D9D'),color('#0DB266'),color('#5191CB')];
	palettes[1]=[color('#FF99C9'),color('#A799FF'),color('#8ACAFF'),color('#57FFEE'),color('#226600'),color('#001E70'),color('#FFE770'),color('#8700F5'),color('#5B00D1'),color('#A31AFF')];
	palettes[2]=[color('#FFCCF7'),color('#FF8FA2'),color('#FF0A99'),color('#00044D'),color('#42FFD0'),color('#42000F'),color('#570017'),color('#38FF4F'),color('#94009E'),color('#00AD68')];
	palettes[3]=[color('#00EB62'),color('#F5B800'),color('#00A1E6'),color('#DB0071'),color('#89FA00'),color('#FFD6E0'),color('#9E9100'),color('#FCFFFA'),color('#EB0008'),color('#000000')];
	palettes[4]=[color('#FF3D61'),color('#050400'),color('#F5F5FF'),color('#00CCF5'),color('#1A9CFF'),color('#2B9900'),color('#D1FF29'),color('#0069CC'),color('#5700D1'),color('#05B0FF')];
	palettes[5]=[color('#ECFFEB'),color('#47FF7B'),color('#2600BD'),color('#20009E'),color('#7E75FF'),color('#FF4242'),color('#FF5CFA'),color('#FF80A1'),color('#FFADC6'),color('#EBA400')];
	palettes[6]=[color('#00B3DB'),color('#006B8F'),color('#FAD000'),color('#FFF1D1'),color('#F50400'),color('#F0ADFF'),color('#F894FF'),color('#FF47B3'),color('#FF2E43'),color('#FF4A3D')];
	palettes[7]=[color('#4F9E00'),color('#A599FF'),color('#FCFFF5'),color('#57FFA0'),color('#FFED66'),color('#D10000'),color('#FFBA0A'),color('#9600E0'),color('#FF5257'),color('#FF691F')];
	palettes[8]=[color('#0A0000'),color('#0051FF'),color('#05C5FF'),color('#BD0026'),color('#FF0080'),color('#FFD09E'),color('#E4FF4D'),color('#6BFFBC'),color('#B3FFD9'),color('#D8FFAD')];
	palettes[9]=[color('#FF751A'),color('#FF9A1F'),color('#FFCD05'),color('#5AAD00'),color('#004C75'),color('#00587A'),color('#00C7B0'),color('#FF2483'),color('#5CE1FF'),color('#D8FFAD')];
	palettes[10]=[color('#004370'),color('#A3D7FF'),color('#85EDFF'),color('#FF75C1'),color('#FF5C64'),color('#FFBE57'),color('#FFC8B8'),color('#FF881A'),color('#FFEA4D'),color('#FFEA4D')];
	palettes[11]=[color('#EBC7FF'),color('#FF8FDD'),color('#EF0FFF'),color('#45009E'),color('#002A4D'),color('#BFFF1F'),color('#00FAFA'),color('#F1FF85'),color('#B3FF57'),color('#B4FF7A')];
	palettes[12]=[color('#FFF5F7'),color('#ADCAFF'),color('#776BFF'),color('#0056D6'),color('#0050C7'),color('#7A0800'),color('#E62E00'),color('#FFA70F'),color('#001729'),color('#007537')];
	palettes[13]=[color('#8A004E'),color('#6800BD'),color('#0008EB'),color('#14C0FF'),color('#42F9FF'),color('#F7FFCC'),color('#DCFF6B'),color('#47FFB9'),color('#E4DBFF'),color('#EBFFF8')];
	palettes[14]=[color('#00B87A'),color('#00AD3D'),color('#006618'),color('#004201'),color('#000000'),color('#0052D6'),color('#3F00C7'),color('#940094'),color('#FFE524'),color('#F5B800')];
	palettes[15]=[color('#FFC757'),color('#FF7A9C'),color('#004EF5'),color('#8AA3FF'),color('#D6DEFF'),color('#000C3D'),color('#000500'),color('#DBFFF7'),color('#75FFEF'),color('#9E005C')];
	palettes[16]=[color('#8FA800'),color('#F5BC00'),color('#F0A000'),color('#DB6A00'),color('#BD2F00'),color('#9214FF'),color('#F52EFF'),color('#FF7AB4'),color('#FFF3F0'),color('#803700')];
	palettes[17]=[color('#E2FFDB'),color('#99FFAF'),color('#0AFFBA'),color('#00CCBE'),color('#A8001C'),color('#006137'),color('#B3001B'),color('#0F0006'),color('#1800CC'),color('#3867FF')];
	palettes[18]=[color('#FFC5B8'),color('#FF7875'),color('#FFE5E8'),color('#8BFF85'),color('#FF7A93'),color('#007E8F'),color('#A80062'),color('#001729'),color('#007537'),color('#008A4C')];
	palettes[19]=[color('#008A87'),color('#00D6D3'),color('#C7FFD7'),color('#FA0032'),color('#66004B'),color('#3D0020'),color('#8300B3'),color('#FF5B1A'),color('#FFB67A'),color('#C20A00')];
	palettes[20]=[color('#008F7E'),color('#00E654'),color('#29FF74'),color('#D9FF80'),color('#FF4000'),color('#36006B'),color('#FF1F4F'),color('#FF7729'),color('#FF4D76'),color('#3A00C2')];
	palettes[21]=[color('#000B61'),color('#C700B0'),color('#FF1AE8'),color('#FF7092'),color('#FFD3BD'),color('#FFEAE5'),color('#FFEFD1'),color('#FFFFFF'),color('#00C7AC'),color('#EBF5FF')];
	palettes[22]=[color('#6B0000'),color('#6B0000'),color('#FFBA0A'),color('#FFCCCC'),color('#FFFFFF'),color('#FFCCF7'),color('#FF8FA2'),color('#FF0A99'),color('#FF2E70'),color('#D1FFF4')];
	palettes[23]=[color('#D2FF80'),color('#FFFFFA'),color('#FFD561'),color('#FF7F0F'),color('#FF1A1A'),color('#8500AD'),color('#841FFF'),color('#FF57EE'),color('#006EDB'),color('#148AFF')];
	palettes[24]=[color('#000024'),color('#001242'),color('#0095C7'),color('#005C7A'),color('#00101A'),color('#FF941A'),color('#FFDF52'),color('#C6FF7A'),color('#F9FF42'),color('#FFADC2')];
	palettes[25]=[color('#94FFB2'),color('#66E8FF'),color('#3DAEFF'),color('#4F9400'),color('#4F9400'),color('#004F80'),color('#FFADB0'),color('#FF333D'),color('#001E70'),color('#DB00A8')];
	palettes[26]=[color('#9861FF'),color('#FFEEDB'),color('#83008A'),color('#DB0050'),color('#29FFBB'),color('#008EAD'),color('#00F098'),color('#00D150'),color('#008F45'),color('#006B62')];
	palettes[27]=[color('#F53500'),color('#FFAA75'),color('#0081D6'),color('#00649E'),color('#005C75'),color('#002252'),color('#000F08'),color('#004F52'),color('#69008F'),color('#2E0047')];
	palettes[28]=[color('#EBFFE5'),color('#B8D5FF'),color('#8FFFF9'),color('#38FFDE'),color('#E00087'),color('#380000'),color('#8400D1'),color('#00A7D1'),color('#001414'),color('#8A0030')];
	palettes[29]=[color('#9EE8FF'),color('#00EB8D'),color('#00EB8D'),color('#8F0026'),color('#2E0500'),color('#AD0031'),color('#FF293E'),color('#FF6A4D'),color('#E00087'),color('#9E0020')];
	palettes[30]=[color('#A8002A'),color('#FFA98A'),color('#FFE5D6'),color('#FFE5D6'),color('#FF243D'),color('#47ACFF'),color('#003E8F'),color('#6669FF'),color('#002B38'),color('#57FFA0')];
	palettes[31]=[color('#007BE0'),color('#14B5FF'),color('#1AD5FF'),color('#FF9029'),color('#FF0905'),color('#FF4D64'),color('#FF794D'),color('#FFF5D6'),color('#00C73C'),color('#FFF82E')];
	palettes[32]=[color('#FFDBDC'),color('#FF4D82'),color('#8A003E'),color('#001E70'),color('#00333D'),color('#BBFF4D'),color('#DBFFB8'),color('#AACC00'),color('#005AA3'),color('#A3E2FF')];
	palettes[33]=[color('#C100D6'),color('#1AF4FF'),color('#FFD28A'),color('#FF6542'),color('#99008A'),color('#002424'),color('#005457'),color('#F55200'),color('#000038'),color('#FF6557')];
	palettes[34]=[color('#479AFF'),color('#4DCFFF'),color('#FF80BF'),color('#FFB999'),color('#FF858F'),color('#9E001D'),color('#FF0544'),color('#4E00AD'),color('#9AFF47'),color('#FAFF5C')];
	palettes[35]=[color('#002925'),color('#003D38'),color('#F0D6FF'),color('#FF8C00'),color('#6B0059'),color('#645CFF'),color('#1FFF96'),color('#0FCFFF'),color('#FF5C95'),color('#FF477B')];
	palettes[36]=[color('#4DFFF0'),color('#1FE5FF'),color('#674DFF'),color('#FF80DB'),color('#BFA3FF'),color('#005700'),color('#A8005F'),color('#9E0B00'),color('#FF0000'),color('#940F00')];
	palettes[37]=[color('#C2FFFF'),color('#61FFD7'),color('#00D19D'),color('#00E0D9'),color('#003309'),color('#00192E'),color('#004099'),color('#FF145B'),color('#4900C7'),color('#2200A8')];
	palettes[38]=[color('#F51919'),color('#F73097'),color('#FA3E69'),color('#FB84B5'),color('#FB93F1'),color('#0805AD'),color('#59058A'),color('#FCFFFA'),color('#F5D400'),color('#020D3B')];
	palettes[39]=[color('#FFA3A3'),color('#FFB8B8'),color('#7ACAFF'),color('#C70000'),color('#990000'),color('#FF5842'),color('#660003'),color('#D10046'),color('#FF4B1A'),color('#330000')];
	palettes[40]=[color('#E6DE00'),color('#7D9900'),color('#FFFCE5'),color('#680075'),color('#FF211A'),color('#A142FF'),color('#4000F0'),color('#002B4D'),color('#002E2C'),color('#0F0A00')];
	palettes[41]=[color('#FFC2F6'),color('#FEA8FF'),color('#B175FF'),color('#7088FF'),color('#6BE1FF'),color('#000061'),color('#8F006B'),color('#FFE3C2'),color('#D11800'),color('#9EFFF9')];
	palettes[42]=[color('#001638'),color('#100075'),color('#BC00F5'),color('#FF70BF'),color('#FFA8B1'),color('#FFDD75'),color('#FF9D14'),color('#EB5600'),color('#FF4405'),color('#FFD6E9')];
	palettes[43]=[color('#000C33'),color('#001E52'),color('#003F7A'),color('#008CB3'),color('#FFFCFA'),color('#FF00A6'),color('#FF667A'),color('#B8DFFF'),color('#FFD57A'),color('#FFE770')];
	palettes[44]=[color('#FF6105'),color('#FFE91F'),color('#81CC00'),color('#5B8000'),color('#FFB029'),color('#9E4C00'),color('#E5FFFF'),color('#00D8DB'),color('#7A000C'),color('#FF38AF')];
	palettes[45]=[color('#FF5842'),color('#00B8EB'),color('#F1E0FF'),color('#00FF59'),color('#0018B3'),color('#C2003D'),color('#A8005D'),color('#B3002A'),color('#007546'),color('#A30021')];
	palettes[46]=[color('#001147'),color('#3CBD00'),color('#FFC800'),color('#FF8629'),color('#FFFFFF'),color('#66C4FF'),color('#94E4FF'),color('#FF1438'),color('#BFBDFF'),color('#FFB3C3')];
	palettes[47]=[color('#FFA69E'),color('#FFF5D6'),color('#ADFFEF'),color('#8FF0FF'),color('#003FD1'),color('#004280'),color('#0069D1'),color('#007FAD'),color('#17005C'),color('#2500E0')];
	palettes[48]=[color('#ADE4FF'),color('#00A8A8'),color('#F5CC00'),color('#FFA200'),color('#F08800'),color('#3D001F'),color('#FF4000'),color('#FFA98A'),color('#94FF97'),color('#FF4B1F')];
	palettes[49]=[color('#4DACFF'),color('#942A00'),color('#C2E8FF'),color('#2483FF'),color('#0000E6'),color('#FF1F84'),color('#7400C2'),color('#3400AD'),color('#FF825C'),color('#FFA114')];
	palettes[50]=[color('#29C2FF'),color('#61ABFF'),color('#94BBFF'),color('#BDE0FF'),color('#FF1A85'),color('#004C8A'),color('#FF66B3'),color('#D6000B'),color('#FF5D52'),color('#5CFF9D')];
	palettes[51]=[color('#FFE5ED'),color('#FFC4BD'),color('#FFA39E'),color('#FFF79E'),color('#FFFF75'),color('#495C00'),color('#A7BD00'),color('#C75000'),color('#004C80'),color('#DFFF0F')];
	palettes[52]=[color('#0070FA'),color('#33CFFF'),color('#4DFFC6'),color('#85FF97'),color('#A3FFA8'),color('#40006B'),color('#FF470F'),color('#FF9705'),color('#000000'),color('#050000')];
	palettes[53]=[color('#00161F'),color('#004D6B'),color('#00ACEB'),color('#70FF7E'),color('#F2FFD6'),color('#FFD1D1'),color('#FF6B93'),color('#FF928A'),color('#BD0097'),color('#FF75B3')];
	palettes[54]=[color('#450061'),color('#3700B8'),color('#006CF0'),color('#5CE7FF'),color('#B8F3FF'),color('#FFBF47'),color('#FFB3C3'),color('#FFCE1F'),color('#00D1A7'),color('#FF4938')];
	palettes[55]=[color('#A3FF47'),color('#D6FF75'),color('#008F58'),color('#00EB6D'),color('#57003A'),color('#FF2605'),color('#D12300'),color('#572100'),color('#290004'),color('#D12300')];
	palettes[56]=[color('#D1FFA3'),color('#AAFF75'),color('#61FFFA'),color('#2ECBFF'),color('#0073E6'),color('#FF1443'),color('#001938'),color('#004FA8'),color('#FF42E3'),color('#001E70')];
	palettes[57]=[color('#FFE15C'),color('#FFF67A'),color('#D9FF80'),color('#7DFF7A'),color('#80FFC8'),color('#004217'),color('#B30021'),color('#FF4D7C'),color('#B8EAFF'),color('#6BC6FF')];
	palettes[58]=[color('#001938'),color('#004FA8'),color('#24FFF0'),color('#86FF57'),color('#BFFF80'),color('#FFBD42'),color('#EB0056'),color('#FFC599'),color('#FF3414'),color('#FF80A6')];
	palettes[59]=[color('#420000'),color('#FFFFFF'),color('#005CB3'),color('#0FD7FF'),color('#A3CBFF'),color('#FF3729'),color('#DB0066'),color('#FFD500'),color('#FF5729'),color('#FF7B00')];
	palettes[60]=[color('#FF2B24'),color('#FF6D57'),color('#006B60'),color('#00EBA4'),color('#FFF04D'),color('#8FA800'),color('#F5BC00'),color('#DBFFF7'),color('#75FFEF'),color('#FFE6A8')];
	palettes[61]=[color('#FF6933'),color('#FFC599'),color('#FFFFC2'),color('#004E8A'),color('#0068B8'),color('#E00087'),color('#9E0020'),color('#9000B8'),color('#660055'),color('#000080')];
	palettes[62]=[color('#FF8AF1'),color('#2CFF14'),color('#FA7D00'),color('#80000B'),color('#0A0200'),color('#FF0A9D'),color('#000E75'),color('#FFFD80'),color('#940023'),color('#0014F0')];
	palettes[63]=[color('#EB7100'),color('#FFD7A8'),color('#FFC180'),color('#00C8F5'),color('#75E8FF'),color('#00E069'),color('#005AAD'),color('#000000'),color('#000000'),color('#009DA8')];
	palettes[64]=[color('#FEE1E5'),color('#FE535E'),color('#360217'),color('#5D0404'),color('#64FCE5'),color('#058F17'),color('#48FABE'),color('#A9F70D'),color('#EDFF85'),color('#7307F8')];
	palettes[65]=[color('#85006E'),color('#00A5AD'),color('#26FF1F'),color('#C2FF52'),color('#FF6D2E'),color('#FF575F'),color('#FF822E'),color('#FFCD42'),color('#FF335F'),color('#FFD23D')];
	palettes[66]=[color('#008A87'),color('#00D6D3'),color('#C7FFD7'),color('#FA0032'),color('#66004B'),color('#002400'),color('#DB0054'),color('#AD000E'),color('#FF0022'),color('#00182E')];
	palettes[67]=[color('#FF462E'),color('#FFB92E'),color('#D5FF2E'),color('#36FA00'),color('#00C756'),color('#940060'),color('#25B800'),color('#2E4AFF'),color('#3374FF'),color('#57BEFF')];
	palettes[68]=[color('#00B3DB'),color('#006B8F'),color('#FAD000'),color('#FFF1D1'),color('#F50400'),color('#8A0200'),color('#FF1F4F'),color('#FF7729'),color('#00F06C'),color('#C880FF')];
	palettes[69]=[color('#006137'),color('#0FFF33'),color('#A3C3FF'),color('#52B1FF'),color('#BC1FFF'),color('#FFDE66'),color('#FF7B42'),color('#FF333D'),color('#CC004B'),color('#D2FF8F')];
	palettes[70]=[color('#002266'),color('#7AF0FF'),color('#FFD6E9'),color('#FA0000'),color('#FF2B0A'),color('#3CBD00'),color('#FFC800'),color('#FF8629'),color('#FFAB24'),color('#EB0800')];
	palettes[71]=[color('#00FA8E'),color('#66FFAB'),color('#B3FFEE'),color('#E0FFFF'),color('#F5FFF7'),color('#2E0F00'),color('#FFB914'),color('#1300BD'),color('#FF4B14'),color('#FFC814')];
	palettes[72]=[color('#8FFFE7'),color('#57FFDD'),color('#1FFFA5'),color('#00DB45'),color('#9E1D00'),color('#FF643D'),color('#FF875C'),color('#6B00BD'),color('#613A00'),color('#002DF5')];
	palettes[73]=[color('#4D0000'),color('#94FF66'),color('#EEFFB8'),color('#FF7F0F'),color('#FF1A1A'),color('#FF0F2F'),color('#FF9F1A'),color('#F50093'),color('#FF7842'),color('#B30077')];
	palettes[74]=[color('#3C5C00'),color('#AD0090'),color('#FAA200'),color('#BAFF42'),color('#D7FF80'),color('#D7B3FF'),color('#FFDBDC'),color('#FF4D82'),color('#FF1A1A'),color('#D6FFF8')];
	palettes[75]=[color('#FFD30F'),color('#F56E00'),color('#E00040'),color('#6505FF'),color('#0095FF'),color('#4DFFF6'),color('#246DFF'),color('#3F009E'),color('#1AFF9C'),color('#FFFAFA')];
	palettes[76]=[color('#020047'),color('#990096'),color('#F00048'),color('#FF4E47'),color('#FFC96B'),color('#1F84FF'),color('#FF9B80'),color('#8AFFEB'),color('#FFCABD'),color('#C7FFBD')];
	palettes[77]=[color('#15009E'),color('#33B300'),color('#84C200'),color('#C5DB00'),color('#CCF000'),color('#FFB3DB'),color('#FFEBF4'),color('#FDFFE5'),color('#FF3D1F'),color('#FF3F38')];
	palettes[78]=[color('#7AFFF2'),color('#6BFFB8'),color('#1AFFAB'),color('#00BD55'),color('#008A3C'),color('#FFC7B3'),color('#FFABA3'),color('#FF9B70'),color('#D800F5'),color('#FFC2C8')];
	palettes[79]=[color('#38FF9C'),color('#0078E0'),color('#E70FFF'),color('#F5FFEB'),color('#FF4766'),color('#FFF5F7'),color('#ADCAFF'),color('#E5F1FF'),color('#FFB647'),color('#FF9A2E')];
	palettes[80]=[color('#EDFFD6'),color('#B0FF80'),color('#FFFF80'),color('#FFB947'),color('#FF8605'),color('#9200E0'),color('#3849FF'),color('#FF4747'),color('#EB0056'),color('#BD004F')];
	palettes[81]=[color('#006D8F'),color('#F09000'),color('#85DAFF'),color('#ABFF0F'),color('#1AD1FF'),color('#FF1AA3'),color('#FA00C0'),color('#FF42A1'),color('#20008A'),color('#DB0F00')];
	palettes[82]=[color('#008500'),color('#007506'),color('#108A00'),color('#03A800'),color('#1AFF1A'),color('#ADD1FF'),color('#8D5CFF'),color('#5CFFD9'),color('#A3CEFF'),color('#E0FFEA')];
	palettes[83]=[color('#FF4751'),color('#E6002E'),color('#003E57'),color('#F1FFE5'),color('#E61B00'),color('#FFFF61'),color('#FEFFEB'),color('#FF9494'),color('#FFEFD1'),color('#47FFF3')];
	palettes[84]=[color('#001413'),color('#FAFFFE'),color('#700200'),color('#AD2B00'),color('#FFB914'),color('#EF0FFF'),color('#00C2AB'),color('#00A846'),color('#16E000'),color('#00A7CC')];
	palettes[85]=[color('#520007'),color('#750800'),color('#A34100'),color('#FF890A'),color('#FFFC47'),color('#0058BD'),color('#4DA0FF'),color('#FFAD5C'),color('#FF29AD'),color('#D100AB')];
	palettes[86]=[color('#DAFF85'),color('#FFE380'),color('#FFE357'),color('#059BFF'),color('#003BA8'),color('#500085'),color('#2500CC'),color('#6B8EFF'),color('#FF573D'),color('#FF99B1')];
	palettes[87]=[color('#E3FFE0'),color('#57FF52'),color('#00E6D6'),color('#0000B8'),color('#FFBF47'),color('#000505'),color('#20008A'),color('#FFAA80'),color('#FF928A'),color('#FFC2A3')];
	palettes[88]=[color('#7200F5'),color('#00F0E8'),color('#FFDEBD'),color('#FFBC57'),color('#FF2934'),color('#D14900'),color('#FF6B7A'),color('#440066'),color('#FF0051'),color('#FF8605')];
	palettes[89]=[color('#F5F5FF'),color('#FF7057'),color('#1A9CFF'),color('#0046D1'),color('#240012'),color('#36006B'),color('#00DB6A'),color('#ECFF1F'),color('#00587A'),color('#998000')];
	palettes[90]=[color('#FFADA8'),color('#66FF99'),color('#00D150'),color('#008F45'),color('#006B62'),color('#5F57FF'),color('#F02000'),color('#242000'),color('#9E0B00'),color('#FF0000')];
	palettes[91]=[color('#36006B'),color('#5F00B3'),color('#245EFF'),color('#61FFFC'),color('#8AFFAF'),color('#A8FFFE'),color('#FFF194'),color('#80FF9F'),color('#ADFFED'),color('#004D1A')];
	palettes[92]=[color('#B8E7FF'),color('#FF57BE'),color('#EB0066'),color('#002794'),color('#1AFF90'),color('#FFBE57'),color('#00587A'),color('#FFCE52'),color('#FFA257'),color('#0F0014')];
	palettes[93]=[color('#47003F'),color('#C70007'),color('#E1FF5C'),color('#F1FF99'),color('#EEFFBD'),color('#8080FF'),color('#9575FF'),color('#DE70FF'),color('#009959'),color('#006B24')];
	palettes[94]=[color('#00CDDB'),color('#57BEFF'),color('#F1E0FF'),color('#00332B'),color('#525DFF'),color('#480052'),color('#2300AD'),color('#E000A8'),color('#450061'),color('#3700B8')];
	palettes[95]=[color('#FFFFFF'),color('#00171F'),color('#003357'),color('#007EA8'),color('#00A4E6'),color('#EB0008'),color('#F5D400'),color('#FF5842'),color('#14B5FF'),color('#EB0062')];
	palettes[96]=[color('#9861FF'),color('#FFEEDB'),color('#83008A'),color('#DB0050'),color('#29FFBB'),color('#008F85'),color('#007A12'),color('#439400'),color('#FF1F48'),color('#FF0F2F')];
	palettes[97]=[color('#FF3B0F'),color('#D6000B'),color('#1F39FF'),color('#5CFF9D'),color('#C0FF99'),color('#FFB8C2'),color('#FFCA75'),color('#36E600'),color('#A0FF47'),color('#A8FFCC')];
	palettes[98]=[color('#004217'),color('#B30021'),color('#FF4D7C'),color('#B8EAFF'),color('#8AFFF7'),color('#F0FFDB'),color('#F3FF99'),color('#BBFFB3'),color('#66FF70'),color('#24FFBD')];
	palettes[99]=[color('#FA003E'),color('#FFDFB3'),color('#DB4900'),color('#660A00'),color('#FFE605'),color('#005457'),color('#000505'),color('#20008A'),color('#A599FF'),color('#57FFA0')];

	background(palettes[w][int(random(10))]);

		  onions.push(new Onion(random(width),random(height),random(100,300)));
		  onions[0].display();
			while(onions.length<int(random(40,70))){
			  var overlap=false;
			  let o=new Onion(random(width),random(height),random(100,300));
			  for(let j=0;j<onions.length;j++){
				  if(dist(o.x,o.y,onions[j].x,onions[j].y)<(o.dim)+(onions[j].dim)){
					  overlap=true;
				  }
			  }

			  if(!overlap){
				onions.push(o);
			  }

		  }

		  blobs.push(new Blb(random(width),random(width),random(30,200),random(32,100)));
		  blobs[0].display();
			while(blobs.length<30){
			  var overlap=false;
			  let o=new Blb(random(width),random(width),random(30,200),random(32,100));
			  for(let j=0;j<blobs.length;j++){
				  if(dist(o.x,o.y,blobs[j].x,blobs[j].y)<(o.dim)+(blobs[j].dim+100)){
					  overlap=true;
				  }
			  }

			  if(!overlap){
				blobs.push(o);
			  }

		  }



	  for(let i=0;i<blobs.length;i++){
		blobs[i].display();
	  }

	  for(let i=0;i<onions.length;i++){
		onions[i].display();
	  }



	  oblobs.push(new Blb(random(width),random(width),random(10,300),random(32,100)));
		  oblobs[0].display();
			while(oblobs.length<12){
			  var overlap=false;
			  let o=new Blb(random(width),random(width),random(10,300),random(32,100));
			  for(let j=0;j<oblobs.length;j++){
				  if(dist(o.x,o.y,oblobs[j].x,oblobs[j].y)<(o.dim)+(oblobs[j].dim+100)){
					  overlap=true;
				  }
			  }

			  if(!overlap){
				oblobs.push(o);
			  }

		  }

		  for(let i=0;i<oblobs.length;i++){
			oblobs[i].display();
		  }






	  for (let i = 0; i < int(random(0,20)); i++) {
		voids.push(new Voids(random(width),random(width),random(50,150),random(32,1000),int(random(1,10))));
		voids[i].display();
	  }


}



function draw(){


}

function keyPressed(){
	save("Genseng.png");
  }



class Onion{

	constructor(x,y,d){
		this.x=x;
		this.y=y;
		this.dim=d;
	}

	display(){
		push();
    	translate(this.x,this.y);
		noStroke();

		push();
		let cc=palettes[w][int(random(10))];
		for(let i=0;i<6;i++){
			scale(.98);
			let newc=lerpColor(palettes[w][int(random(10))],cc,i/6)
			newc.setAlpha(130);
			fill(newc);
			beginShape() ;
		  for(var e=0;e<200+1;e++){
			  let x = cos(0.1 * e);				//x is calculated by increasing the cos value by the angle step for each iteration
			  let y = sin(0.1 * e);				//y is calculated by increasing the sin value by the angle step for each iteration
			  var p = createVector(x, y);				//create a vector with the x and y components
			  p.normalize();						//then we normalize the vector (magnitude of 1)
			  let n= map(noise(p.x * 0.5 + 78*.01, p.y * 0.5 + 78*.01), 0, 1, this.dim, this.dim+50);  //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
			  p.mult(n);							//then multiply that random value by the vector
			  //fill(palette[int(random(5))]);
			  vertex(p.x, p.y);
			  ellipse(p.x,p.y,random(40,60),random(40,60));
		  }
		  endShape();

	  	}pop();

		  push();
		cc=palettes[w][int(random(10))];
		for(let i=0;i<6;i++){
			scale(.98);
			let newc=lerpColor(palettes[w][int(random(10))],cc,i/6)
			newc.setAlpha(130);
			fill(newc);
			beginShape() ;
		  for(var e=0;e<200+1;e++){
			  let x = cos(0.1 * e);				//x is calculated by increasing the cos value by the angle step for each iteration
			  let y = sin(0.1 * e);				//y is calculated by increasing the sin value by the angle step for each iteration
			  var p = createVector(x, y);				//create a vector with the x and y components
			  p.normalize();						//then we normalize the vector (magnitude of 1)
			  let n= map(noise(p.x * 0.5 + 78*.01, p.y * 0.5 + 78*.01), 0, 1, this.dim-50, this.dim+50-50);  //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
			  p.mult(n);							//then multiply that random value by the vector
			  vertex(p.x, p.y);
			  ellipse(p.x,p.y,random(40,60),random(40,60));
		  }
		  endShape();

	  	}pop();

		  push();
		cc=palettes[w][int(random(10))];
		for(let i=0;i<6;i++){
			scale(.98);
			let newc=lerpColor(palettes[w][int(random(10))],cc,i/6)
			newc.setAlpha(130);
			fill(newc);
			beginShape() ;
		  for(var e=0;e<200+1;e++){
			  let x = cos(0.1 * e);				//x is calculated by increasing the cos value by the angle step for each iteration
			  let y = sin(0.1 * e);				//y is calculated by increasing the sin value by the angle step for each iteration
			  var p = createVector(x, y);				//create a vector with the x and y components
			  p.normalize();						//then we normalize the vector (magnitude of 1)
			  let n= map(noise(p.x * 0.5 + 78*.01, p.y * 0.5 + 78*.01), 0, 1, this.dim-100, this.dim+50-100);  //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
			  p.mult(n);							//then multiply that random value by the vector
			  //fill(palette[int(random(5))]);
			  vertex(p.x, p.y);
			  ellipse(p.x,p.y,random(40,60),random(40,60));
		  }
		  endShape();

	  	}pop();

		  push();
		  cc=palettes[w][int(random(10))];
		  for(let i=0;i<6;i++){
			  scale(.98);
			  let newc=lerpColor(palettes[w][int(random(10))],cc,i/6)
			newc.setAlpha(130);
			fill(newc);
			  beginShape() ;
			for(var e=0;e<200+1;e++){
				let x = cos(0.1 * e);				//x is calculated by increasing the cos value by the angle step for each iteration
				let y = sin(0.1 * e);				//y is calculated by increasing the sin value by the angle step for each iteration
				var p = createVector(x, y);				//create a vector with the x and y components
				p.normalize();						//then we normalize the vector (magnitude of 1)
				let n= map(noise(p.x * 0.5 + 78*.01, p.y * 0.5 + 78*.01), 0, 1, this.dim-150, this.dim+50-150);  //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
				p.mult(n);							//then multiply that random value by the vector
				//fill(palette[int(random(5))]);
				vertex(p.x, p.y);
				ellipse(p.x,p.y,random(40,60),random(40,60));
			}
			endShape();

			}pop();

			push();
			cc=palettes[w][int(random(10))];
			for(let i=0;i<6;i++){
				scale(.98);
				let newc=lerpColor(palettes[w][int(random(10))],cc,i/6)
			newc.setAlpha(130);
			fill(newc);
				beginShape() ;
			  for(var e=0;e<200+1;e++){
				  let x = cos(0.1 * e);				//x is calculated by increasing the cos value by the angle step for each iteration
				  let y = sin(0.1 * e);				//y is calculated by increasing the sin value by the angle step for each iteration
				  var p = createVector(x, y);				//create a vector with the x and y components
				  p.normalize();						//then we normalize the vector (magnitude of 1)
				  let n= map(noise(p.x * 0.5 + 78*.01, p.y * 0.5 + 78*.01), 0, 1, this.dim-200, this.dim+50-200);  //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
				  p.mult(n);							//then multiply that random value by the vector
				  //fill(palette[int(random(5))]);
				  vertex(p.x, p.y);
				  ellipse(p.x,p.y,random(40,60),random(40,60));
			  }
			  endShape();

			  }pop();


		pop();
	}
}


class Blb{

	constructor(x,y,d,r){
		this.x=x;
		this.y=y;
		this.dim=d;
		this.r=r;
	}

	display(){
		push();
    	translate(this.x,this.y);
		rotate(random(PI / 15));
		noStroke();
		push();
		let cc=palettes[w][int(random(10))];
		let sc=palettes[w][int(random(10))];
		for(let i=0;i<6;i++){
			scale(.98);
			let newc=lerpColor(sc,cc,i/6)
			newc.setAlpha(130);
			fill(newc);
			beginShape() ;
		  for(var e=0;e<2*PI;e+=0.1){
			  let xoff = cos(e)+this.r;				//x is calculated by increasing the cos value by the angle step for each iteration
			  let yoff = sin(e)+this.r;				//y is calculated by increasing the sin value by the angle step for each iteration
			  let n = map(noise(xoff*this.r*0.05,yoff*this.r*0.05),0,1,this.dim-26, this.dim+200);							//then multiply that random value by the vector
			  let x=n*cos(e);
			  let y=n*sin(e);
			  vertex(x,y);
			  ellipse(x,y,random(40,60),random(40,60));
		  }
		  endShape();

	  	}pop();

		  push();
		  cc=palettes[w][int(random(10))];
		  sc=palettes[w][int(random(10))];
		  for(let i=0;i<6;i++){
			  scale(.98);
			  let newc=lerpColor(sc,cc,i/6)
			  newc.setAlpha(130);
			  fill(newc);
			  beginShape() ;
			for(var e=0;e<2*PI;e+=0.1){
				let xoff = cos(e)+this.r;				//x is calculated by increasing the cos value by the angle step for each iteration
				let yoff = sin(e)+this.r;				//y is calculated by increasing the sin value by the angle step for each iteration
				let n = map(noise(xoff*this.r*0.05,yoff*this.r*0.05),0,1,this.dim-26-50, this.dim+200-50);							//then multiply that random value by the vector
				let x=n*cos(e);
				let y=n*sin(e);
				vertex(x,y);
				ellipse(x,y,random(40,60),random(40,60));
			}
			endShape();

			}pop();

			push();
			cc=palettes[w][int(random(10))];
			sc=palettes[w][int(random(10))];
			for(let i=0;i<6;i++){
				scale(.98);
				let newc=lerpColor(sc,cc,i/6)
				newc.setAlpha(130);
				fill(newc);
				beginShape() ;
			  for(var e=0;e<2*PI;e+=0.1){
				  let xoff = cos(e)+this.r;				//x is calculated by increasing the cos value by the angle step for each iteration
				  let yoff = sin(e)+this.r;				//y is calculated by increasing the sin value by the angle step for each iteration
				  let n = map(noise(xoff*this.r*0.05,yoff*this.r*0.05),0,1,this.dim-26-50-50, this.dim+200-50-50);							//then multiply that random value by the vector
				  let x=n*cos(e);
				  let y=n*sin(e);
				  vertex(x,y);
				  ellipse(x,y,random(40,60),random(40,60));
			  }
			  endShape();

			  }pop();

			  push();
			  cc=palettes[w][int(random(10))];
			  sc=palettes[w][int(random(10))];
			  for(let i=0;i<6;i++){
				  scale(.98);
				  let newc=lerpColor(sc,cc,i/6)
				  newc.setAlpha(130);
				  fill(newc);
				  beginShape() ;
				for(var e=0;e<200+1;e++){
					let xoff = cos(e)+this.r;				//x is calculated by increasing the cos value by the angle step for each iteration
					let yoff = sin(e)+this.r;				//y is calculated by increasing the sin value by the angle step for each iteration
					let n = map(noise(xoff*this.r*0.05,yoff*this.r*0.05),0,1,this.dim-26-50-50-50, this.dim+200-50-50-50);							//then multiply that random value by the vector
					let x=n*cos(e);
					let y=n*sin(e);
					vertex(x,y);
					ellipse(x,y,random(40,60),random(40,60));
				}
				endShape();

				}pop();

				push();
				cc=palettes[w][int(random(10))];
				sc=palettes[w][int(random(10))];
				for(let i=0;i<6;i++){
					scale(.98);
					let newc=lerpColor(sc,cc,i/6)
					newc.setAlpha(130);
					fill(newc);
					beginShape() ;
				  for(var e=0;e<200+1;e++){
					  let xoff = cos(e)+this.r;				//x is calculated by increasing the cos value by the angle step for each iteration
					  let yoff = sin(e)+this.r;				//y is calculated by increasing the sin value by the angle step for each iteration
					  let n = map(noise(xoff*this.r*0.05,yoff*this.r*0.05),0,1,this.dim-26-50-50-50-50, this.dim+200-50-50-50-50);							//then multiply that random value by the vector
					  let x=n*cos(e);
					  let y=n*sin(e);
					  vertex(x,y);
					  ellipse(x,y,random(40,60),random(40,60));
				  }
				  endShape();

				  }pop();

		pop();
	}

}



class Voids{

	constructor(x,y,d,r,n){
		this.x=x;
		this.y=y;
		this.dim=d;
		this.r=r;
		this.number=n;
	}

	display(){
		push();
    	translate(this.x,this.y);
		noStroke();

		push();
		let sc=palettes[w][int(random(10))];
		stroke(sc);
		strokeWeight(8);
		noFill();
		for(let i=0;i<this.number;i++){
			scale(.8);
		beginShape() ;
    	for(var e=0;e<200+1;e++){
        	let x = cos(0.1 * e);				//x is calculated by increasing the cos value by the angle step for each iteration
        	let y = sin(0.1 * e);				//y is calculated by increasing the sin value by the angle step for each iteration
			var p = createVector(x, y);				//create a vector with the x and y components
			p.normalize();						//then we normalize the vector (magnitude of 1)
        	let n= map(noise(p.x * 0.8 + this.r*1, p.y * 0.8 + this.r*1), 0, 1, this.dim, this.dim+300);  //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
        	p.mult(n);							//then multiply that random value by the vector
        	vertex(p.x, p.y);
    	}
    	endShape();

	  	}pop();

		pop();
	}

}