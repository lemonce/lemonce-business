delimiter $
drop trigger if exists increaseUserSummary $
create trigger increaseUserSummary
after insert on biz_limitation
for each row begin
	if new.ACTIVED=1 then
		update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER+new.INCREMENT WHERE USER_ID = new.USER_ID;
	end if;
end $

drop trigger if exists decreaseUserSummary $
create trigger decreaseUserSummary
after delete on biz_limitation
for each row begin
	update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER-old.INCREMENT WHERE USER_ID = old.USER_ID;
end $

drop trigger if exists createSummary $
create trigger createSummary after insert on biz_user
for each row begin
	insert into biz_user_summary(USER_ID) values(new.USER_ID);
end $

drop trigger if exists updateUserSummary $
create trigger updateUserSummary
after update on biz_limitation
for each row begin
    if new.ACTIVED != old.ACTIVED then
		if new.ACTIVED = 1 then
			update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER+new.INCREMENT WHERE USER_ID = new.USER_ID;
        else
			update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER-new.INCREMENT WHERE USER_ID = new.USER_ID;
        end if;
	else 
		if new.INCREMENT != old.INCREMENT then
		update biz_user_summary set LIMITATION_NUMBER=LIMITATION_NUMBER+(new.INCREMENT-old.INCREMENT) WHERE USER_ID = new.USER_ID;
        end if;
    end if;
end $
delimiter ;