REM @echo off

cd ..

REM echo AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
build.bat full
REM echo AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA


REM 



REM @echo off
REM cd ..
REM 
REM echo AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
REM 
REM set CompilerParams= -MT -nologo -Gm- -GR- -Od -Oi -W4 -wd4201 -wd4100 -wd4244 -wd4189 -DQUOTE_INTERNAL=1 -DQUOTE_SLOW=1
REM REM set CompilerParams = /MT /nologo /O2 /Ot /fp:fast /arch:AVX2 /Gv /GL 
REM set CommonLinkerFlags= /LTCG -incremental:no -opt:ref user32.lib Gdi32.lib Xinput.lib Winmm.lib
REM set Compiler= "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Tools\MSVC\14.29.30037\bin\Hostx64\x64\cl.exe"
REM call "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\VC\Auxiliary\Build\vcvarsall.bat" x64
REM 
REM %Compiler% %CompilerParams% /O2 /LD quote.cpp /link /EXPORT:GameUpdateAndRender
REM %Compiler% %CompilerParams% /O2 win32.cpp /link %CommonLinkerFlags%
REM 
REM echo AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
REM 
REM %1