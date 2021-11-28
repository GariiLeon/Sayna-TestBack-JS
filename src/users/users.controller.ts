import { Body, Controller, Get, Param, Put, Query, Res } from '@nestjs/common';
import { UpdateUserDto } from './dtos/users.dto';
// import { SingleUserInterface } from './interfaces/user.single.return.interface';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get(':id')
  async getOne(@Res() res, @Param('id') id) {
    const user = await this.usersService.getOne(id);
    delete user.password;
    delete user.__v;
    if (user) {
      return res.status(200).json({
        error: false,
        user,
      });
    } else {
      return res.status(404).json({
        error: true,
        message: "L'utilisateur n'existe pas",
      });
    }
  }

  @Put()
  async updateUser(
    @Res() res,
    @Query('id') id,
    @Body() userData: UpdateUserDto,
  ) {
    const updated = await this.usersService.updateUsers(id, userData);
    if (updated) {
      return res.status(200).json({
        error: false,
        message: "L'utilisateur a été modifié avec succès",
      });
    } else {
      return res.status(401).json({
        error: true,
        message: 'Données vides ou invalides',
      });
    }
  }
}
