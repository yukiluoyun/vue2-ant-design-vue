import { http as $http } from "@/utils/interceptors";
export const getUserInfoApi = (
  userCode,
  userName,
  areaId,
  timestamp,
  signature
) => {
  return $http({
    method: "get",
    url: "/system/loginApplet",
    params: {
      userCode,
      userName,
      areaId,
      timestamp,
      signature,
    },
  });
};
