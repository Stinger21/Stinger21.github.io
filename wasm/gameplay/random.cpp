#pragma once

static uint32 RandomNumberIndex;

static uint32 RandomNumberTable[] = {
  0x0c917ba5, 0x0f0898fd, 0x0f556b99, 0x01d62467, 0x09440591, 0x199502d1, 0x028f266a, 0x11e70305, 0x055d2ef7, 0x0ccc5f5c, 0x16e3887a, 0x0c8c22d0, 0x05623caa, 0x03293cd7, 0x1406998b, 0x13d2cc09
, 0x0defc9d3, 0x0e18b95f, 0x19411432, 0x0bf69891, 0x06fb2bfb, 0x057a4c81, 0x0617e4e7, 0x0773346f, 0x175108ef, 0x090529a7, 0x1872a28f, 0x199585bc, 0x0f026928, 0x09d79ace, 0x0a6d4215, 0x0b0a001f
, 0x031c0abc, 0x0b4b5443, 0x1478405c, 0x1150103d, 0x0bc098fb, 0x1747166e, 0x10497c06, 0x00940a19, 0x1347a319, 0x0ee3e7ad, 0x086d9269, 0x1190fc30, 0x0b1419dd, 0x00076527, 0x05440961, 0x17081d4d
, 0x15eb06da, 0x0f1a3b16, 0x1017d2b6, 0x10739c86, 0x010b64ed, 0x00e6c896, 0x12fcc48b, 0x0d54400f, 0x08b6c57d, 0x0cc18783, 0x0af11df4, 0x00cedaed, 0x0d1ed4b6, 0x0c94a6da, 0x0d89d0e7, 0x0cbc88bf
, 0x0aa23cb9, 0x0cd754d2, 0x06637481, 0x0634bb39, 0x12df9b2b, 0x0a5f35da, 0x18342326, 0x0415b2d8, 0x0cce962d, 0x03c78c68, 0x15f4dd82, 0x0aa00cb0, 0x153b6e2c, 0x1336b2ed, 0x15419492, 0x0a780f52
, 0x06ce554e, 0x18866746, 0x0a46e77a, 0x0c30f3f9, 0x0dc37d85, 0x122fefa7, 0x0eaaeca8, 0x022def71, 0x0937efb6, 0x0f9ef447, 0x13700ed3, 0x064fe95b, 0x060e66d6, 0x02633a92, 0x0f2e50f9, 0x1322c381
, 0x15ace911, 0x005ef492, 0x13b80933, 0x05571854, 0x12b7c66f, 0x03da4876, 0x08d4acce, 0x05477cf3, 0x14a76929, 0x0b752763, 0x07f8532a, 0x0e2ea08f, 0x06a90653, 0x1626955f, 0x0fe329d4, 0x0d5caa66
, 0x0d4c0fea, 0x086f11ad, 0x04f6ff41, 0x14ce7f50, 0x131b348c, 0x038942d8, 0x13278d26, 0x0dafab7f, 0x054d5045, 0x01960d25, 0x029d3e3b, 0x09c1f403, 0x128f8174, 0x092b3834, 0x03319db2, 0x184259be
, 0x13a38d72, 0x16208773, 0x0ec06f2c, 0x1360932d, 0x15ebcb23, 0x147716d4, 0x02b44a2d, 0x16ad760b, 0x169d72dc, 0x17f78486, 0x0b7899b7, 0x07052d71, 0x18af7ffa, 0x0733b258, 0x0e55e97d, 0x0495268d
, 0x164120d7, 0x086c5818, 0x09f3215d, 0x0a66a855, 0x0d9eec19, 0x119f5108, 0x0d74585a, 0x168b521f, 0x1168506c, 0x16b3aa67, 0x18878ab1, 0x14ab52fa, 0x19905d63, 0x0e789aad, 0x013cb79e, 0x1143eda9
, 0x14c3748d, 0x01bb1a1d, 0x0b9639b8, 0x01bf3128, 0x18fe37e6, 0x022c4508, 0x1753465e, 0x0872a296, 0x07364b23, 0x1550af4f, 0x01bf46f8, 0x123d7fa9, 0x0bb02eb3, 0x0bc3c05c, 0x0dff2c6c, 0x162914bd
, 0x0ed49ef1, 0x0fd3c0a7, 0x0390f690, 0x0ffb4270, 0x0849e394, 0x01eed38d, 0x074fffe3, 0x1833d88c, 0x0443431f, 0x0fad52b0, 0x08d9e141, 0x01850277, 0x1770ef32, 0x0dfcd4a1, 0x04a2bc49, 0x01337d1e
, 0x118321ab, 0x09304dcd, 0x191363a6, 0x103e411c, 0x19601f09, 0x1638abba, 0x11df471d, 0x0f8d88d2, 0x09c88987, 0x1425d4bb, 0x120c2779, 0x0bcfc208, 0x10bf24ab, 0x0d1e6f65, 0x1947e53d, 0x12393147
, 0x0c0037bf, 0x0cf76fdb, 0x01e2ac80, 0x0710c818, 0x147f5736, 0x19678be7, 0x01f238ba, 0x06f0da9d, 0x0e4728a3, 0x0c63d4d5, 0x1463bdfe, 0x0b6aec90, 0x190870a9, 0x0efcfb6a, 0x0d5376b0, 0x0947537e
, 0x0d428e77, 0x11ff4879, 0x0ce8e893, 0x15fa1129, 0x1873943c, 0x08a84be0, 0x125ccf14, 0x066c1d9e, 0x08d07112, 0x0887d64a, 0x050231a0, 0x030a7841, 0x130cfb74, 0x03bfbdcc, 0x004ad55b, 0x08163fa9
, 0x0aed4ac4, 0x108bf765, 0x0bc573c7, 0x17d52fa1, 0x10a25ac4, 0x174f11c5, 0x06c10d81, 0x0db522fd, 0x126f92e2, 0x1258ada9, 0x170c5af8, 0x08d5002c, 0x181f97ab, 0x021d2d22, 0x0106b90d, 0x087376cd
, 0x14bdf482, 0x152f28e3, 0x0f160609, 0x0a31eca3, 0x17e8a28d, 0x1759e440, 0x083479e6, 0x0280d09b, 0x0f978fa6, 0x0a27713d, 0x08d5bb72, 0x17cb482f, 0x128d9791, 0x0af17599, 0x05113a55, 0x077bebfd
, 0x0354471f, 0x07248bbc, 0x07f54193, 0x04ffd1d3, 0x0b8960bf, 0x11f20cd5, 0x1700ca70, 0x147aa7fa, 0x0ddd3f37, 0x0fe3b35e, 0x0fcef948, 0x03b0cb34, 0x14fa7969, 0x07e26c73, 0x11be04c7, 0x096cfcbf
, 0x0c6f64ad, 0x125da86a, 0x0221bee3, 0x051f362a, 0x16debd8a, 0x00de3bbf, 0x0ec5a61f, 0x04a6647a, 0x14f9e93a, 0x0961b749, 0x008955ce, 0x0468f2c1, 0x0fcfbccb, 0x05012038, 0x14194a97, 0x03e21381
, 0x0742a6b9, 0x0ed39915, 0x07a6ddec, 0x13e67a61, 0x0ddec0a9, 0x124c832a, 0x11897ac8, 0x059e3d4c, 0x0b3e41ff, 0x115e82f0, 0x10148a6f, 0x153afd91, 0x0f8b7f2e, 0x0a377415, 0x04a635ff, 0x001af688
, 0x0761b46b, 0x08e0b97f, 0x1196f787, 0x17b89482, 0x031ec14b, 0x102198c6, 0x0737f6b2, 0x131529c7, 0x03b807cb, 0x18deb1cc, 0x02929788, 0x01f54222, 0x067715a8, 0x16fe4c71, 0x119a0939, 0x17aeaef8
, 0x069ca26e, 0x0835b47a, 0x16fc318c, 0x11a496b2, 0x0cd34a60, 0x089db3d1, 0x04e4f3a1, 0x09035032, 0x064538b5, 0x0f35e9f8, 0x0145dbcd, 0x0fafeb70, 0x016960cc, 0x1510e2c9, 0x13f0c680, 0x0ede209a
, 0x08237270, 0x0c5c355a, 0x0a7cbf72, 0x070846bc, 0x061cee39, 0x017b4b05, 0x06ea9626, 0x0f943ed9, 0x0ff944c5, 0x0153b404, 0x08e63775, 0x18b281bb, 0x08926eee, 0x0b5ec415, 0x121824b7, 0x1001c78a
, 0x0ced4510, 0x1129c835, 0x11eb3397, 0x090e6334, 0x02994b52, 0x1289aac8, 0x049e8648, 0x09c9fa68, 0x1429f1f1, 0x0f44f194, 0x04a80d0d, 0x09ab7e3a, 0x05b5f537, 0x19352c38, 0x0db0c0bc, 0x0c3504d1
, 0x102d8020, 0x136a8c45, 0x1661b970, 0x13cf2741, 0x163fddb2, 0x0656abd3, 0x16c041a6, 0x193e0b42, 0x01227518, 0x1281b7cf, 0x047c94f5, 0x0572f6c7, 0x018d75d2, 0x03963a73, 0x12df0c2d, 0x0c36abe6
, 0x0de73518, 0x04f25ac4, 0x1643a27d, 0x06b3aaaa, 0x00d4b2f3, 0x09aaa51e, 0x0c05fc72, 0x1145adde, 0x190b9652, 0x04fb3a82, 0x051adf09, 0x14fa8d4e, 0x09bc5a87, 0x0a80e751, 0x112256e8, 0x0d493d07
, 0x168e6541, 0x0c7f58b0, 0x01a04fb0, 0x1215c45f, 0x02059ea0, 0x00fbd4ed, 0x040b40df, 0x0348a8b7, 0x0e7bb453, 0x057b1484, 0x0cee3120, 0x0876cd2c, 0x12eea88f, 0x11c9ed59, 0x0a3ab81e, 0x0c8bdf98
, 0x013223f6, 0x036379cc, 0x112c4e73, 0x134c7c7e, 0x026b4d96, 0x134d2b64, 0x18aea58c, 0x1431421d, 0x147000b2, 0x14b2195a, 0x146f8fdd, 0x0333e7db, 0x11e606e8, 0x0d3151a8, 0x0616444a, 0x0530b434
, 0x0684a2d0, 0x0c42e489, 0x06cb3882, 0x14273854, 0x00e04218, 0x17b8cada, 0x0260e7e7, 0x0a1475b9, 0x01ba352e, 0x13924d9b, 0x072c34f3, 0x0b2a4a62, 0x16326b23, 0x12cdf1e6, 0x139915f2, 0x04783966
, 0x01df1d30, 0x08368033, 0x191e5288, 0x0f625f53, 0x10be9f35, 0x164ea436, 0x0e5998af, 0x0502c4ed, 0x11c6c45c, 0x11a8540c, 0x15fc9499, 0x03aca2c6, 0x00f9116e, 0x02473bda, 0x07c4f35a, 0x1533cc9e
, 0x0d701538, 0x0c61c6e7, 0x10d7af3a, 0x07387f56, 0x0eaac813, 0x0850c37f, 0x0cffd7da, 0x0a616295, 0x168ec5f7, 0x0eb6a7c2, 0x06dcf221, 0x06676f9e, 0x18ec8730, 0x109e3ca9, 0x104c1d99, 0x11093237
, 0x194829ce, 0x1196a01c, 0x0c57c023, 0x08498d51, 0x0d2986c0, 0x1261201d, 0x1276e528, 0x0ced044e, 0x0b1ad36e, 0x0a40fae4, 0x0f20494b, 0x0db2cd82, 0x07b4df6d, 0x0b59acdb, 0x129a9ed3, 0x0cb330ed
, 0x00c0e561, 0x134a035d, 0x1234dba6, 0x0ebed39d, 0x071c1ceb, 0x138e737e, 0x14f05ed3, 0x0e130aff, 0x06126f2c, 0x02c47d6a, 0x132f958c, 0x005abe5b, 0x03f24d45, 0x01363e3a, 0x0f014cce, 0x0f23e75a
, 0x0a5d18ce, 0x05b5b6e7, 0x0a85a575, 0x064eb09e, 0x0d53a85b, 0x060259a9, 0x0dcc2ad9, 0x163b6adb, 0x10d5e0ab, 0x0c194fb6, 0x198e0ad4, 0x1600f2a4, 0x16e83748, 0x05bc00bf, 0x03f5a3cb, 0x052aae7a
, 0x0405f083, 0x063c947a, 0x11551c3e, 0x0c5605ad, 0x17b9e4a8, 0x05786f20, 0x15d5c020, 0x0d524a8d, 0x057b7eb8, 0x1962fe83, 0x09cbb898, 0x01865a55, 0x0a862cf9, 0x0264c542, 0x184489c9, 0x114124dd
, 0x01ff3d6d, 0x0bb43a39, 0x0d820b5a, 0x0fba69c2, 0x13c38bc5, 0x16ac39f9, 0x087e1757, 0x196a63ab, 0x06373f74, 0x0e8024d0, 0x12a41b69, 0x12edfe59, 0x02c1a824, 0x110ef088, 0x040a580b, 0x02364844
, 0x16e58af8, 0x098dea2d, 0x0b8e40da, 0x03fc77d4, 0x18095d28, 0x18e7cff5, 0x0747aabb, 0x0b73f8dc, 0x178571d5, 0x10b68e56, 0x04ca3183, 0x12307531, 0x02b74636, 0x07186054, 0x042d7cae, 0x065355e8
, 0x060b5392, 0x00a625df, 0x084e3f46, 0x1531569b, 0x154761bf, 0x13ae8fca, 0x18d42b14, 0x11311e25, 0x15241f81, 0x0d00e06b, 0x17eff8cc, 0x10872754, 0x192e951d, 0x03355fce, 0x062e4bab, 0x0675fa89
, 0x0d54ba79, 0x0e97028b, 0x01c77c90, 0x0a0724f9, 0x09772d6b, 0x08bc9f9e, 0x14f26916, 0x1547fc72, 0x109dd0f1, 0x169ce5c8, 0x0de2854d, 0x1977d813, 0x06808cf9, 0x06a7a8e3, 0x0fc8abba, 0x13dd56c9
, 0x145b93d6, 0x1524f24a, 0x18ee59ee, 0x107d3143, 0x0a441b1d, 0x1199388a, 0x10d79041, 0x09233179, 0x1355da60, 0x06418dce, 0x00d69054, 0x11c9f774, 0x0b652600, 0x0c5b7c75, 0x0136973d, 0x0f163c7a
, 0x0e585dde, 0x0d111498, 0x0ee204c2, 0x00df83aa, 0x033732c1, 0x18577f77, 0x117eef11, 0x016dbb69, 0x041e2800, 0x02835dec, 0x151ed76c, 0x0f0c305c, 0x138ac2cf, 0x0fe43d44, 0x06c45ef6, 0x055163d5
, 0x00430be3, 0x0adcfdee, 0x127f5d15, 0x019a4592, 0x0a6c3e28, 0x14d1cbf2, 0x0f684dc1, 0x0479c22f, 0x1328c4c5, 0x14bf4d61, 0x1498eaaa, 0x07b4061f, 0x0ed88b7b, 0x118d690a, 0x0e2de77c, 0x0105ce9d
, 0x14911c36, 0x0a21c4ce, 0x07eeab94, 0x052cf6c5, 0x0289b3ea, 0x16f83e57, 0x13fe4c69, 0x029534e9, 0x159e3ce0, 0x08e0db9c, 0x06f1b1cd, 0x024230da, 0x15be467f, 0x12eb3d3c, 0x04f02bef, 0x15c971e9
, 0x035b1ba7, 0x068e5ebf, 0x14a95bf4, 0x1562ae58, 0x01a391e3, 0x051a2588, 0x029df013, 0x096339f7, 0x0b2ecf2f, 0x0b187b4c, 0x0e1c269e, 0x147da547, 0x10b48a8e, 0x1633cd9d, 0x165e9dbc, 0x052e60fb
, 0x10e90272, 0x04ec055d, 0x17d6939a, 0x052ec9dc, 0x13917f81, 0x169d0aab, 0x038daf07, 0x00e4f0af, 0x0290a13d, 0x01ba8bd2, 0x162e287b, 0x020e4aa4, 0x149dae57, 0x150206c7, 0x03cfda48, 0x170bb54c
, 0x0fb48861, 0x17b5bfe7, 0x192caedc, 0x11084f6a, 0x034f3ce7, 0x11eb5264, 0x03cae808, 0x11595c98, 0x0308ce4c, 0x034821fa, 0x16a25e27, 0x030c04b7, 0x140deca7, 0x0d43b525, 0x098c3aaa, 0x0c895468
, 0x0e7d60bd, 0x12f88073, 0x05ffd47a, 0x18f20e3e, 0x167a53da, 0x02dc2bdc, 0x13f3c820, 0x02b42909, 0x15637115, 0x190ef737, 0x105e0aed, 0x15d9b4ad, 0x14b6c3c6, 0x10181396, 0x012a2489, 0x0701ee5b
, 0x1105a182, 0x0e637534, 0x10e58c61, 0x15a24571, 0x1377e649, 0x0784d63b, 0x0d854878, 0x13870f41, 0x15adbc06, 0x0f69a095, 0x025c1916, 0x050c7756, 0x182167a6, 0x0c558b1b, 0x0ea600e1, 0x11b3d2d9
, 0x15bcfd58, 0x15808be7, 0x0d746ada, 0x18e58d67, 0x1442f204, 0x0731081b, 0x00ce19fb, 0x16f72d11, 0x151cd493, 0x163a243c, 0x0c6a27f9, 0x07d20658, 0x0aa2487b, 0x150dd66c, 0x17342633, 0x118f3e68
, 0x16882ddd, 0x17199235, 0x188727b1, 0x15e4dc0e, 0x0ea41fdd, 0x0b8a542b, 0x10336b8b, 0x0057efaf, 0x07593f83, 0x0298b7ae, 0x102a6726, 0x0f104314, 0x09c37210, 0x15ee40e1, 0x00b96e69, 0x188d9f68
, 0x08661bd9, 0x132d9d0a, 0x0a63c377, 0x0068ec64, 0x164d952e, 0x0277fb86, 0x0c8d161a, 0x094ae9d3, 0x0e7f770c, 0x08eb9c88, 0x036f73f5, 0x1475a0d2, 0x0e02ce57, 0x1824b501, 0x18d63cba, 0x1927a6bf
, 0x04d66e17, 0x0da20a87, 0x153671bf, 0x096c94c2, 0x140e4b33, 0x0b16e215, 0x05b2d28c, 0x17d6c5f9, 0x0b0af449, 0x0f487cad, 0x176406ca, 0x0c5b9e21, 0x0955b691, 0x0015eb8b, 0x0fb0c31c, 0x117d238f
, 0x0c2b1cd0, 0x0eb6ff5b, 0x142879bb, 0x0469cbb9, 0x14f9bfec, 0x0546c2d5, 0x0e543a55, 0x04cf802a, 0x0600abfd, 0x0c793a4b, 0x081ce4f0, 0x1537daf7, 0x07e067f3, 0x0a5219ff, 0x0555a891, 0x0a06131b
, 0x08709bdd, 0x1709deb4, 0x01406081, 0x07721a21, 0x0947f314, 0x055ed5f1, 0x12308a04, 0x0ae90336, 0x104ec857, 0x0fb89871, 0x08a34b8a, 0x0828f6b0, 0x0be01140, 0x13bb5d28, 0x130f5f43, 0x098cd4ae
, 0x14366ee5, 0x060548b2, 0x01c7ff82, 0x10f7d3d6, 0x11a50eb3, 0x0faffcf1, 0x016c2c6e, 0x09a06f4c, 0x09fbaf9c, 0x173b72a0, 0x15fc866d, 0x0f5792f4, 0x0fcd3829, 0x16d23af8, 0x00c6f3ba, 0x0ebd2942
, 0x07d50348, 0x17356ef4, 0x072f8f60, 0x0cf5cf4f, 0x052a153f, 0x08da2f1d, 0x1961c01b, 0x01c9fefd, 0x0dc5b962, 0x12c7ab13, 0x11adabff, 0x060cfb06, 0x003fe6e2, 0x12f42d5a, 0x1956b599, 0x0c797822
, 0x099eb770, 0x07d43339, 0x01f63b6b, 0x013ffdd4, 0x022cc462, 0x15c8ccee, 0x181528c5, 0x13c63618, 0x03d5e005, 0x066c83f4, 0x18f27053, 0x084669ea, 0x071d660d, 0x07870b8e, 0x1830c00e, 0x0287a89d
, 0x145b3e38, 0x121d129f, 0x0a05ba8c, 0x14e9909c, 0x02e0cae6, 0x05d71f9e, 0x033e5281, 0x0a6df947, 0x0a3a8065, 0x0bc37d69, 0x06f7688a, 0x04135e79, 0x0e50d735, 0x004b6074, 0x18412e83, 0x1464e1c0
, 0x163e518a, 0x0b679d3d, 0x05928754, 0x1639e443, 0x169b3f57, 0x05c6f4ab, 0x01f28cd7, 0x0c46ff16, 0x10844073, 0x10b56ba1, 0x0bb87b16, 0x16b0a2b9, 0x004eb48f, 0x0714c9b5, 0x0e171f46, 0x064e0fba
, 0x0d985db4, 0x1211d09a, 0x13c527c0, 0x06b2f1a2, 0x106f9b12, 0x18cbfe51, 0x07fe1721, 0x15bd8fa1, 0x0692b4c8, 0x1863629a, 0x159aedb1, 0x0a92ce20, 0x13447652, 0x018a456e, 0x18b5eca0, 0x0595292f
, 0x05f2ced9, 0x0f6058c9, 0x091a2091, 0x063d09f8, 0x15e3f801, 0x08484c94, 0x1470886e, 0x106200d9, 0x09cb3fee, 0x163e4890, 0x067a86f8, 0x0bb93793, 0x0c254ee2, 0x176f5b96, 0x016a244c, 0x01954b74
, 0x04104a8f, 0x0d80a496, 0x01506f0f, 0x11ed8905, 0x10ec2cea, 0x0ee16949, 0x08912f51, 0x14f8a525, 0x126e0b64, 0x07644b55, 0x0afb1408, 0x15663a80, 0x0b7b18b8, 0x17ba958e, 0x11d485a3, 0x193a9773
, 0x0ecae2d1, 0x098574cd, 0x0e7465df, 0x0e2ac2fb, 0x05118d0e, 0x05d6772e, 0x029ad02c, 0x1469ab9b, 0x17b93e63, 0x0965789f, 0x0cddea77, 0x0c8ac336, 0x0e9df5e6, 0x0101d566, 0x0d1cb44a, 0x0e6a71c1
, 0x0467f4db, 0x12771f4b, 0x10106c92, 0x1922405c, 0x13cde142, 0x0beb2e1b, 0x0d945ef2, 0x16c10344, 0x14a82ff0, 0x10fd9301, 0x079c7076, 0x00d55c12, 0x16ce0430, 0x0af994b7, 0x0a4cc87d, 0x01f613f2 };