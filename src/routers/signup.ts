const { registerUser } = require("../functions/registerUser.ts");

/**
   * @openapi
   * /signup:
   *  post:
   *      tags:
   *      - Sign up
   *      description: Allows a user to create an account on the platform
   *      parameters:
   *      - in: body
   *        name: username
   *        description: The username assigned to the user
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          alec_bradley
   *      - in: body
   *        name: password
   *        description: The password the unlocks the account of user
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          alecBrad2019
   *      - in: body
   *        name: name
   *        description: The first name of the user
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          Alec
   *      - in: body
   *        name: surname
   *        description: The last name of the user
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          Bradley
   *      - in: body
   *        name: birth_date
   *        description: The user's birthday
   *        required: true
   *        schema:
   *          type: date
   *        example:
   *          01/09/1995
   *      - in: body
   *        name: email
   *        description: The email address of the username
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          alec.bradley@gmail.com
   *      - in: body
   *        name: address
   *        description: The user's address in real-world setting e.g. Besiktas Meydani Cami Sokagi
   *        required: true
   *        schema:
   *          type: string
   *        example:
   *          Rumeli Hisari, Hisar Ustu Nispetiye Cd No:7, 34342 Sariyer/Istanbul
   *      - in: body
   *        name: latitude
   *        description: The latitude part of the coordinates that refer to the address
   *        required: true
   *        example:
   *          54.234
   *        schema:
   *          type: float
   *      - in: body
   *        name: longitude
   *        description: The longitude part of the coordinates that refer to the address
   *        required: true
   *        example:
   *          45.593
   *        schema:
   *          type: float
   *      responses:
   *        200:
   *          description: The user is registered successfully
   *        400:
   *          description: The inserted data may not be consistent with the defined schema of the user
   */
const signup = async (req: any, res: any) => {
    const payload = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        birth_date: req.body.birth_date,
        email: req.body.email,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    };
    const registerResult = await registerUser(payload);
    if (registerResult.success == true) {
        res.status(200).json(registerResult);
    }
    else {
        res.status(400).json(registerResult);
    }
}
export { signup }