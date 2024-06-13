import os

command = 'curl --request GET \
  --url https://openapi.data.uwaterloo.ca/v3/subjects \
  --header "x-api-key: 4C2707F76683436FBFBADD018AB79115"'

result = os.popen(command).read()
print (result)