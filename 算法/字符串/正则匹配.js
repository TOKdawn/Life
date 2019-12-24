// [正则表达式匹配](https://leetcode-cn.com/problems/regular-expression-matching/) 

    function isMatch( s, p){
	   var  dp = [[]];  
	    dp[0][0]=true; 
	    for(var i=0;i<p.length();i++){
		    if(p[i]=='*' && dp[0][i-1]){
			    dp[0][i+1]=true; 
		    }else{
			    dp[0][i+1]=false;
		    }
	    }
	    if(s.length()>=1){
		    for(var i=1;i<s.length()+1;i++){
			    dp[i][0]=false;
		    }
	    }
	    for(var i=0;i<s.length();i++){
		    for(var j=0;j<p.length();j++){
			    if(s[i]==p[j] || p[j]=='.'){
				    dp[i+1][j+1]=dp[i][j];
			    }else if(p[j]=='*'){
				    if(p[j-1]!=s[i] && p[j-1]!='.'){
					    dp[i+1][j+1]=dp[i+1][j-1];
				    }else{
					    if(dp[i][j+1] || dp[i+1][j] || dp[i+1][j-1]) {
						    dp[i+1][j+1]=true;
					    }else{
						    dp[i+1][j+1]=false;
					    }
				    }
			    }
			    else{
				    dp[i+1][j+1]=false;
			    }
		    }
	    }
	    return dp[s.length()][p.length()];
    }
