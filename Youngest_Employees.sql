-- Youngest Employees --

SELECT e_uin.UIN, e.NAME
FROM EMPLOYEE e
JOIN EMPLOYEE_UIN e_uin
ON e.ID = e_uin.ID
WHERE e.AGE < 25
ORDER BY e.NAME ASC, e.ID ASC;
