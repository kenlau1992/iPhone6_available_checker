## README.md

# iPhone6 available checker
---------------------
I know the pain of keep pressing F5 of cmd + r in iReserve page. Apple now releases the iPhone in iReserve at random and you never when is available and which model. When you get the news from any social network, it is already very late. My friends have written a bash script to look up the iReserve but it is not friendly to M$ users (I am not a fan of M$), so I write this script to help M$ user look up the iReserve automtically.
This script helps you to keep track the iPhone you want by input argument in the function. Just one function call and you can will never need to press any F5 or cmd + r.


# How To Use
---------------------
 1. copy the whole script and paste in the Console of browser
 2. type start([time], [iPhone type], [color], [capacity], [apple store])
   * time
     - how you want to talk to server
     - input: inetger or floating point
       - the value is in **second**
   * iPhone type
     - which iPhone you want to look for
     - input: string or null
       - either '6' or '6+' or null if you do not want to specify
   * color
     - which color of iPhone you want to look for
     - input: string or null
       - either 'grey' or 'silver' or 'gold' or null if you do not want to specify
   * capacity
     - which capacity of iPhone you want to look for
     - input: integer or null
       - either 16 or 64 or 128 or null if you do not want to specify
   * apple store
     - which apple store  you want to look for
     - input: string or null
       - either 'ifc' or 'fw' or 'cb' or null if you do not want to specify
       - idc -> IFC Mall, fw -> Festival Walk, cb -> Causeway Bay
 3. Enjoy the waiting

# Note
---------------------
  * There is a variable called debug which can check if the requirement you input is the same as the program will output, it is advice to turn it on to ensure you do not miss any chance due to any bugs appear in my script
  *  If you want to looks up at other Apple store, please change the variable 'loc' to the one you want to look up. Remember to keep the '.json' at the end. Don't replace the '.json'

# Bug
---------------------
  Please report any bug to me and I will fix it soon