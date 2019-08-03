#include<iostream>	
#include <cmath> 
using namespace std;
int main()
{	//定义时分秒
	int s,m,h;
	cout<<"请输入时间（秒数）："<<endl;
	cin>>s;
	//换算时间
	h=s%3660;
	s=s-3600*h;
	m=s%60;
	s=s-60*m;
	cout<<"转换后的结果是："<<endl;
	//判断输出形式
	if (h=0)
		if (m=0)
		{cout<<s<<"秒"<<endl;}
		else
		{cout<<m<<"分"<<s<<"秒"<<endl;}
	else
	{cout<<h<<"小时"<<<m<<"分"<<s<<"秒"<<endl;}
return 0;
}
