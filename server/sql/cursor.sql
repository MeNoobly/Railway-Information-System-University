DO $$
	DECLARE 
		curs CURSOR FOR SELECT train_name FROM trains;
		rec TEXT;
	
	BEGIN
		OPEN curs;
		
		FETCH NEXT FROM curs INTO rec;

		WHILE FOUND
		LOOP
		   RAISE NOTICE '%', rec;
		   FETCH NEXT FROM curs INTO rec;
		END LOOP;

		CLOSE curs;
	END;
$$;
-- выводит все имена поездов