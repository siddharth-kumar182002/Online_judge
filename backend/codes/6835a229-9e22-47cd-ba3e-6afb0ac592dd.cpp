#include <iostream> 
using namespace std;
int main() { 
 ios_base::sync_with_stdio(false);
    cin.tie(NULL);
  int x;
  cin>>x;
  while(x--){
  int n;
  cin>>n;
  cout<<n<<endl;
  for(int i=1;i<=n;i++){
  cout<<i<<" ";
  }
  cout<<endl;
  } 
  return 0; 
}